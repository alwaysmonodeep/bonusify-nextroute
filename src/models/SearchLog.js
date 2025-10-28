// models/SearchLog.js
import mongoose from 'mongoose';

const SearchLogSchema = new mongoose.Schema({
  // Search details
  query: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200
  },
  
  resultCount: {
    type: Number,
    default: 0,
    min: 0
  },
  
  executionTime: {
    type: Number, // in milliseconds
    default: 0,
    min: 0
  },
  
  resultType: {
    type: String,
    enum: ['search', 'suggestions', 'popular', 'exact', 'partial', 'fuzzy_match', 'no_results'],
    default: 'search'
  },
  
  // User tracking (anonymous)
  userIdentifier: {
    type: String, // Could be IP, session ID, or user ID
    required: true,
    default: 'anonymous'
  },
  
  ipAddress: {
    type: String,
    default: 'unknown'
  },
  
  userAgent: {
    type: String,
    default: 'unknown'
  },
  
  // Click tracking
  clickedStore: {
    type: String, // Store slug or ID
    default: null
  },
  
  clickPosition: {
    type: Number, // Position in search results (1, 2, 3...)
    default: null
  },
  
  // Additional metadata
  sessionId: {
    type: String,
    default: null
  },
  
  referrer: {
    type: String,
    default: null
  },
  
  // Timestamps
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, // adds createdAt and updatedAt
  collection: 'searchlogs'
});

// Indexes for better query performance
SearchLogSchema.index({ createdAt: -1 }); // For date range queries
SearchLogSchema.index({ query: 1, createdAt: -1 }); // For popular queries
SearchLogSchema.index({ userIdentifier: 1, createdAt: -1 }); // For user analytics
SearchLogSchema.index({ clickedStore: 1, createdAt: -1 }); // For store performance
SearchLogSchema.index({ resultCount: 1 }); // For zero-result queries

// Virtual for search success
SearchLogSchema.virtual('isSuccessful').get(function() {
  return this.resultCount > 0;
});

// Static methods for common queries
SearchLogSchema.statics.getPopularQueries = function(days = 7, limit = 10) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return this.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    { $group: { 
        _id: '$query', 
        count: { $sum: 1 },
        avgResults: { $avg: '$resultCount' },
        lastSearched: { $max: '$createdAt' }
      }
    },
    { $sort: { count: -1 } },
    { $limit: limit },
    { $project: {
        query: '$_id',
        count: 1,
        avgResults: { $round: ['$avgResults', 1] },
        lastSearched: 1,
        _id: 0
      }
    }
  ]);
};

SearchLogSchema.statics.getZeroResultQueries = function(days = 7, limit = 10) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return this.aggregate([
    { $match: { createdAt: { $gte: startDate }, resultCount: 0 } },
    { $group: { 
        _id: '$query', 
        count: { $sum: 1 },
        lastSearched: { $max: '$createdAt' }
      }
    },
    { $sort: { count: -1 } },
    { $limit: limit },
    { $project: {
        query: '$_id',
        count: 1,
        lastSearched: 1,
        _id: 0
      }
    }
  ]);
};

SearchLogSchema.statics.getUserStats = function(days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return this.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    { $group: {
        _id: '$userIdentifier',
        totalSearches: { $sum: 1 },
        successfulSearches: { 
          $sum: { $cond: [{ $gt: ['$resultCount', 0] }, 1, 0] } 
        },
        uniqueQueries: { $addToSet: '$query' },
        avgExecutionTime: { $avg: '$executionTime' },
        lastActivity: { $max: '$createdAt' }
      }
    },
    { $project: {
        userIdentifier: '$_id',
        totalSearches: 1,
        successfulSearches: 1,
        uniqueQueries: { $size: '$uniqueQueries' },
        successRate: { 
          $multiply: [
            { $divide: ['$successfulSearches', '$totalSearches'] }, 
            100
          ]
        },
        avgExecutionTime: { $round: ['$avgExecutionTime', 2] },
        lastActivity: 1,
        _id: 0
      }
    },
    { $sort: { totalSearches: -1 } }
  ]);
};

// Pre-save hook to normalize data
SearchLogSchema.pre('save', function(next) {
  // Normalize query
  if (this.query) {
    this.query = this.query.trim().toLowerCase();
  }
  
  // Set timestamp if not provided
  if (!this.timestamp) {
    this.timestamp = new Date();
  }
  
  next();
});

export default mongoose.models.SearchLog || mongoose.model('SearchLog', SearchLogSchema);