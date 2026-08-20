import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    shortName: {
      type: String,
      required: true,
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

    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition",
      required: true
    },

  },
  {
    timestamps: true,
  }
);

teamSchema.index(
    { competition: 1, shortName: 1 },
    { unique: true }
)

export default mongoose.model( "Team" , teamSchema);