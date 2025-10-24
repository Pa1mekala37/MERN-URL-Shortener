import mongoose from "mongoose";
import { nanoid } from "nanoid";

const shortUrlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: [true, 'Full URL is required'],
    trim: true,
    maxlength: [2048, 'URL is too long'],
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Please provide a valid URL with http or https protocol'
    }
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Clicks cannot be negative']
  },
  lastClicked: {
    type: Date,
    default: null
  },
  userAgents: [{
    type: String,
    trim: true
  }],
  referrers: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Indexes for better performance
shortUrlSchema.index({ shortUrl: 1 });
shortUrlSchema.index({ fullUrl: 1 });
shortUrlSchema.index({ createdAt: -1 });
shortUrlSchema.index({ clicks: -1 });
shortUrlSchema.index({ lastClicked: -1 });

// Virtual for click rate
shortUrlSchema.virtual('clickRate').get(function() {
  if (!this.createdAt) return 0;
  const daysSinceCreation = (Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceCreation > 0 ? this.clicks / daysSinceCreation : 0;
});

// Pre-save middleware to ensure protocol
shortUrlSchema.pre('save', function(next) {
  // Ensure protocol
  if (this.fullUrl && !this.fullUrl.startsWith('http')) {
    this.fullUrl = 'https://' + this.fullUrl;
  }
  next();
});

// Static methods
shortUrlSchema.statics.findByShortUrl = function(shortUrl) {
  return this.findOne({ shortUrl });
};

shortUrlSchema.statics.getPopularUrls = function(limit = 10) {
  return this.find().sort({ clicks: -1 }).limit(limit);
};

shortUrlSchema.statics.getRecentUrls = function(limit = 10) {
  return this.find().sort({ createdAt: -1 }).limit(limit);
};

const urlModel = mongoose.model('ShortUrl', shortUrlSchema);

export { urlModel };
