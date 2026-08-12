import mongoose from "mongoose";

const competitionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    active: {
      type: Boolean,
      trim: true,
      default: true,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model( "Competition" , competitionSchema);