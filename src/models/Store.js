import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    url: { type: String },

    branding: {
      logo: { type: String },
      badge: { type: String },
    },

    deal: {
      qualifier: { type: String },
      type: { type: String },
      maxRateValue: { type: Number },
      maxRateType: { type: String },
    },

    termsAndConditions: [{ type: String }],

    categoryRates: [
      {
        rate: { type: Number },
        category: { type: String },
        subcategories: [{ type: String }],
        maxCashback: { type: String, default: null },

        currency: { type: String },
        rateType: { type: String },
      },
    ],

    catalogue: [
      {
        imageUrl: { type: String },
        altText: { type: String },
      },
    ],

    cashbackTimeline: [
      {
        milestone: { type: String },
        duration: { type: Number },
        unit: { type: String },
        description: { type: String },
      },
    ],

    metadata: {
      lastUpdated: { type: Date, default: null },
      status: { type: String },
      currency: { type: String },
      region: { type: String },
      popularRank: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export default mongoose.models.Store || mongoose.model("Store", StoreSchema);