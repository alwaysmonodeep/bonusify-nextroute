import dbConnect from "@/lib/mongoose";
import SearchLog from "@/models/SearchLog"; // You'll need to create this model

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    return getAnalytics(req, res);
  } else if (req.method === "POST") {
    return logSearch(req, res);
  } else {
    return res.status(405).json({
      success: false,
      message: "Method not allowed. Use GET or POST"
    });
  }
}

// GET /api/search/analytics - Get search analytics
async function getAnalytics(req, res) {
  try {
    const { 
      period = '7d', 
      startDate, 
      endDate,
      detailed = false 
    } = req.query;

    const dateFilter = buildDateFilter(period, startDate, endDate);

    // Parallel queries for better performance
    const [
      totalSearches,
      uniqueUsers,
      popularQueries,
      searchesByDay,
      avgResultsPerSearch,
      zeroResultQueries,
      topPerformingStores,
      searchTrends
    ] = await Promise.all([
      // Total searches
      SearchLog.countDocuments(dateFilter),
      
      // Unique users (based on IP or user identifier)
      SearchLog.distinct('userIdentifier', dateFilter).then(users => users.length),
      
      // Popular queries (top 10)
      SearchLog.aggregate([
        { $match: dateFilter },
        { $group: { 
            _id: '$query', 
            count: { $sum: 1 },
            avgResults: { $avg: '$resultCount' },
            lastSearched: { $max: '$createdAt' }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $project: {
            query: '$_id',
            count: 1,
            avgResults: { $round: ['$avgResults', 1] },
            lastSearched: 1,
            _id: 0
          }
        }
      ]),
      
      // Searches by day
      SearchLog.aggregate([
        { $match: dateFilter },
        { $group: {
            _id: { 
              $dateToString: { 
                format: '%Y-%m-%d', 
                date: '$createdAt' 
              }
            },
            searches: { $sum: 1 },
            uniqueUsers: { $addToSet: '$userIdentifier' }
          }
        },
        { $project: {
            date: '$_id',
            searches: 1,
            uniqueUsers: { $size: '$uniqueUsers' },
            _id: 0
          }
        },
        { $sort: { date: 1 } }
      ]),
      
      // Average results per search
      SearchLog.aggregate([
        { $match: dateFilter },
        { $group: {
            _id: null,
            avgResults: { $avg: '$resultCount' }
          }
        }
      ]).then(result => result[0]?.avgResults || 0),
      
      // Zero result queries (top 10)
      SearchLog.aggregate([
        { $match: { ...dateFilter, resultCount: 0 } },
        { $group: { 
            _id: '$query', 
            count: { $sum: 1 },
            lastSearched: { $max: '$createdAt' }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $project: {
            query: '$_id',
            count: 1,
            lastSearched: 1,
            _id: 0
          }
        }
      ]),
      
      // Top performing stores (most searched)
      SearchLog.aggregate([
        { $match: { ...dateFilter, clickedStore: { $exists: true } } },
        { $group: { 
            _id: '$clickedStore', 
            clicks: { $sum: 1 },
            uniqueSearches: { $addToSet: '$query' }
          }
        },
        { $project: {
            store: '$_id',
            clicks: 1,
            uniqueQueries: { $size: '$uniqueSearches' },
            _id: 0
          }
        },
        { $sort: { clicks: -1 } },
        { $limit: 10 }
      ]),
      
      // Search trends (hourly distribution)
      SearchLog.aggregate([
        { $match: dateFilter },
        { $group: {
            _id: { $hour: '$createdAt' },
            searches: { $sum: 1 }
          }
        },
        { $project: {
            hour: '$_id',
            searches: 1,
            _id: 0
          }
        },
        { $sort: { hour: 1 } }
      ])
    ]);

    // Build response
    const analyticsData = {
      summary: {
        totalSearches,
        uniqueUsers,
        avgResultsPerSearch: Math.round(avgResultsPerSearch * 10) / 10,
        period,
        dateRange: {
          start: dateFilter.createdAt?.$gte || null,
          end: dateFilter.createdAt?.$lte || null
        }
      },
      popularQueries,
      searchesByDay,
      zeroResultQueries,
      topPerformingStores,
      searchTrends: formatHourlyTrends(searchTrends),
      performance: {
        successRate: totalSearches > 0 ? 
          Math.round(((totalSearches - zeroResultQueries.reduce((sum, q) => sum + q.count, 0)) / totalSearches) * 100 * 10) / 10 
          : 0,
        avgQueriesPerUser: uniqueUsers > 0 ? Math.round((totalSearches / uniqueUsers) * 10) / 10 : 0
      }
    };

    // Add detailed breakdown if requested
    if (detailed === 'true') {
      const detailedStats = await getDetailedAnalytics(dateFilter);
      analyticsData.detailed = detailedStats;
    }

    res.status(200).json({
      success: true,
      data: analyticsData,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

// POST /api/search/analytics - Log a search event
async function logSearch(req, res) {
  try {
    const {
      query,
      resultCount,
      executionTime,
      userIdentifier,
      userAgent,
      clickedStore = null,
      resultType = 'search'
    } = req.body;

    // Validation
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query is required"
      });
    }

    // Create search log entry
    const searchLog = new SearchLog({
      query: query.trim(),
      resultCount: parseInt(resultCount) || 0,
      executionTime: parseInt(executionTime) || 0,
      userIdentifier: userIdentifier || req.ip || 'anonymous',
      userAgent: userAgent || req.headers['user-agent'] || 'unknown',
      ipAddress: req.ip || 'unknown',
      clickedStore,
      resultType,
      timestamp: new Date()
    });

    await searchLog.save();

    res.status(200).json({
      success: true,
      message: "Search logged successfully",
      logId: searchLog._id
    });

  } catch (error) {
    console.error("Search logging error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to log search",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

// Helper function to build date filter
function buildDateFilter(period, startDate, endDate) {
  const now = new Date();
  let filter = {};

  if (startDate && endDate) {
    filter.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  } else {
    switch (period) {
      case '1d':
        filter.createdAt = { $gte: new Date(now - 24 * 60 * 60 * 1000) };
        break;
      case '7d':
        filter.createdAt = { $gte: new Date(now - 7 * 24 * 60 * 60 * 1000) };
        break;
      case '30d':
        filter.createdAt = { $gte: new Date(now - 30 * 24 * 60 * 60 * 1000) };
        break;
      case '90d':
        filter.createdAt = { $gte: new Date(now - 90 * 24 * 60 * 60 * 1000) };
        break;
      case '1y':
        filter.createdAt = { $gte: new Date(now - 365 * 24 * 60 * 60 * 1000) };
        break;
      default:
        filter.createdAt = { $gte: new Date(now - 7 * 24 * 60 * 60 * 1000) };
    }
  }

  return filter;
}

// Format hourly trends data
function formatHourlyTrends(trends) {
  const hours = Array.from({ length: 24 }, (_, i) => ({ hour: i, searches: 0 }));
  
  trends.forEach(trend => {
    hours[trend.hour] = { hour: trend.hour, searches: trend.searches };
  });
  
  return hours;
}

// Get detailed analytics breakdown
async function getDetailedAnalytics(dateFilter) {
  const [queryLengthStats, deviceStats, resultTypeStats] = await Promise.all([
    // Query length distribution
    SearchLog.aggregate([
      { $match: dateFilter },
      { $project: {
          queryLength: { $strLenCP: '$query' }
        }
      },
      { $bucket: {
          groupBy: '$queryLength',
          boundaries: [0, 5, 10, 20, 50, 100],
          default: '100+',
          output: { count: { $sum: 1 } }
        }
      }
    ]),
    
    // Device/browser stats (basic)
    SearchLog.aggregate([
      { $match: dateFilter },
      { $project: {
          isMobile: { 
            $regexMatch: { 
              input: '$userAgent', 
              regex: /Mobile|Android|iPhone/i 
            }
          }
        }
      },
      { $group: {
          _id: '$isMobile',
          count: { $sum: 1 }
        }
      }
    ]),
    
    // Result type distribution
    SearchLog.aggregate([
      { $match: dateFilter },
      { $group: {
          _id: '$resultType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ])
  ]);

  return {
    queryLengthDistribution: queryLengthStats,
    deviceStats: deviceStats.map(stat => ({
      device: stat._id ? 'Mobile' : 'Desktop',
      count: stat.count
    })),
    resultTypeDistribution: resultTypeStats.map(stat => ({
      type: stat._id || 'unknown',
      count: stat.count
    }))
  };
}