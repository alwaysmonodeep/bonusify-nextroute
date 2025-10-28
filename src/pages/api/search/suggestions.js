import dbConnect from "@/lib/mongoose";
import Store from "@/models/Store";

// In-memory cache for popular searches
const searchCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 100;

// Rate limiting (simple in-memory)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 30;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  // Simple rate limiting
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  
  if (!rateLimitMap.has(clientIP)) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  } else {
    const rateLimit = rateLimitMap.get(clientIP);
    if (now > rateLimit.resetTime) {
      rateLimit.count = 1;
      rateLimit.resetTime = now + RATE_LIMIT_WINDOW;
    } else if (rateLimit.count >= MAX_REQUESTS_PER_MINUTE) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later."
      });
    } else {
      rateLimit.count++;
    }
  }

  await dbConnect();

  const { q, limit = 8 } = req.query;
  const searchLimit = Math.min(parseInt(limit), 20);

  try {
    let stores;
    let resultType = 'popular';
    let fromCache = false;

    if (!q?.trim()) {
      // Popular stores - cache these heavily
      const cacheKey = 'popular_stores';
      if (searchCache.has(cacheKey)) {
        const cached = searchCache.get(cacheKey);
        if (Date.now() - cached.timestamp < CACHE_TTL) {
          stores = cached.results;
          fromCache = true;
        }
      }

      if (!fromCache) {
        stores = await Store.find({})
          .limit(searchLimit)
          .select('brandName slug deal branding.logo')
          .sort({ 'metadata.popularRank': 1 })
          .lean();
        
        // Cache popular stores
        if (searchCache.size >= MAX_CACHE_SIZE) {
          const oldestKey = searchCache.keys().next().value;
          searchCache.delete(oldestKey);
        }
        searchCache.set(cacheKey, {
          results: stores,
          timestamp: Date.now()
        });
      }
    } else {
      const query = q.trim().toLowerCase();
      const cacheKey = `search_${query}_${searchLimit}`;
      
      // Check cache first
      if (searchCache.has(cacheKey)) {
        const cached = searchCache.get(cacheKey);
        if (Date.now() - cached.timestamp < CACHE_TTL) {
          stores = cached.results;
          fromCache = true;
        }
      }

      if (!fromCache) {
        stores = await searchStoresOptimized(q.trim(), searchLimit);
        
        // Cache search results
        if (stores.length > 0) {
          if (searchCache.size >= MAX_CACHE_SIZE) {
            const oldestKey = searchCache.keys().next().value;
            searchCache.delete(oldestKey);
          }
          searchCache.set(cacheKey, {
            results: stores,
            timestamp: Date.now()
          });
        }
      }
      
      resultType = stores.length > 0 ? 'results' : 'no_results';
    }

    const results = stores.map(store => ({
      name: store.brandName,
      slug: store.slug,
      deal: store.deal,
      logo: store.branding?.logo,
      type: 'store'
    }));

    res.status(200).json({
      success: true,
      results,
      query: q?.trim() || '',
      resultType,
      count: results.length,
      cached: fromCache, // For debugging
      responseTime: Date.now() - now
    });

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      message: "Search failed"
    });
  }
}

async function searchStoresOptimized(query, limit) {
  try {
    const queryLength = query.length;
    
    // For very short queries, use optimized regex directly
    if (queryLength <= 2) {
      return await Store.find({
        brandName: { $regex: `^${query}`, $options: 'i' }
      })
      .select('brandName slug deal branding.logo')
      .limit(limit)
      .lean();
    }
    
    // For longer queries, try text search first
    let stores = await Store.find({
      $text: { $search: query }
    })
    .select('brandName slug deal branding.logo')
    .limit(limit)
    .lean();

    // If text search returns good results, return them
    if (stores.length >= Math.min(3, limit)) {
      return stores;
    }

    // Fallback to starts-with search
    const startsWithResults = await Store.find({
      brandName: { $regex: `^${query}`, $options: 'i' }
    })
    .select('brandName slug deal branding.logo')
    .limit(limit)
    .lean();

    // Combine results
    const combinedResults = [
      ...stores,
      ...startsWithResults.filter(s => !stores.some(existing => existing._id.equals(s._id)))
    ].slice(0, limit);

    return combinedResults;

  } catch (error) {
    console.error("Search error, using simple fallback:", error);
    
    return await Store.find({
      brandName: { $regex: `^${query}`, $options: 'i' }
    })
    .select('brandName slug deal branding.logo')
    .limit(limit)
    .lean();
  }
}

// Cleanup old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 60000); // Cleanup every minute