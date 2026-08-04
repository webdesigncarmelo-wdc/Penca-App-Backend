import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    shortName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 3
    },

    name: {
      type: String,
      required: true,
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

export default mongoose.model( "Team" , teamSchema);