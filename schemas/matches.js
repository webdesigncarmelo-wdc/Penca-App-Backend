import mongoose from "mongoose"

const matchSchema = new mongoose.Schema({
  
    matchday: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Matchday",
      required: true
    },

    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    homeGoals: {
      type: Number,
      default: null,
      min: 0,
      validate: {
        validator: (value) => value === null || Number.isInteger(value),
        message: "Goals must be an integer",
      },
    },

    awayGoals: {
      type: Number,
      default: null,
      min: 0,
      validate: {
        validator: (value) => value === null || Number.isInteger(value),
        message: "Goals must be an integer",
      },
    },

    status: {
      type: String,
      enum: ["pending", "played", "suspended"],
      default: "pending",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

// indice para ayuar a buscar por matchdays
matchSchema.index({ matchday: 1, status: 1 });

export default mongoose.model( 'Match' , matchSchema)