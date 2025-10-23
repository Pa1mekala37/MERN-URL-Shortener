import mongoose from "mongoose";
import { nanoid } from "nanoid";

const shortUrlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: [true, 'Full URL is required'],
      trim: true,
      maxlength: [2048, 'URL is too long'],
      validate: {
        validator: function(v: string) {
          return /^https?:\/\/.+/.test(v);
        },
        message: 'Please provide a valid URL with http or https protocol'
      }
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid().substring(0, 10),
      trim: true,
      lowercase: true
    },
    clicks: {
      type: Number,
      default: 0,
      min: [0, 'Clicks cannot be negative']
    },
    // Add metadata for analytics
    lastClicked: {
      type: Date,
      default: null
    },
    // Add user agent tracking for analytics
    userAgents: [{
      type: String,
      trim: true
    }],
    // Add referrer tracking
    referrers: [{
      type: String,
      trim: true
    }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add indexes for better performance
shortUrlSchema.index({ shortUrl: 1 }, { unique: true });
shortUrlSchema.index({ fullUrl: 1 });
shortUrlSchema.index({ createdAt: -1 });
shortUrlSchema.index({ clicks: -1 });
shortUrlSchema.index({ lastClicked: -1 });

// Add virtual for click rate
shortUrlSchema.virtual('clickRate').get(function() {
  const daysSinceCreation = Math.max(1, (Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24));
  return Math.round(this.clicks / daysSinceCreation * 100) / 100;
});

// Pre-save middleware to ensure URL format
shortUrlSchema.pre('save', function(next) {
  if (this.fullUrl && !this.fullUrl.startsWith('http')) {
    this.fullUrl = 'https://' + this.fullUrl;
  }
  next();
});

// Static method to find by short URL with caching
shortUrlSchema.statics.findByShortUrl = function(shortUrl: string) {
  return this.findOne({ shortUrl }).lean();
};

// Static method to get popular URLs
shortUrlSchema.statics.getPopularUrls = function(limit = 10) {
  return this.find()
    .sort({ clicks: -1 })
    .limit(limit)
    .select('fullUrl shortUrl clicks createdAt')
    .lean();
};

// Static method to get recent URLs
shortUrlSchema.statics.getRecentUrls = function(limit = 10) {
  return this.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('fullUrl shortUrl clicks createdAt')
    .lean();
};

export const urlModel = mongoose.model("ShortUrl", shortUrlSchema);
