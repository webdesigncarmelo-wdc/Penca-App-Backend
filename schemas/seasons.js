import mongoose from "mongoose"

const seasonSchema = new mongoose.Schema({
  
    name: {
      type: String,
      required: true,
      trim: true,
    },
    
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition",
      required: true
    },

    active: {
      type: Boolean,
      default: true,
    },

  },
  {
    timestamps: true,
  },
    
);

seasonSchema.index(
    { competition: 1, name: 1 },
    { unique: true }
)

export default mongoose.model( 'Season' , seasonSchema)