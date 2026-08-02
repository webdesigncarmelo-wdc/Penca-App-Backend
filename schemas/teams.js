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
    /*year: {
        type: Number, 
        min: 1800, 
        max: 2050, 
        required: false 
    }*/
  },
  {
    timestamps: true,
  }
);

export default mongoose.model( "Team" , teamSchema);