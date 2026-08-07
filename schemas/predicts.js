import mongoose from "mongoose"

const predictSchema = new mongoose.Schema({
  
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    homeGoals: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
      validate: {
        validator: (value) => Number.isInteger(value),
        message: "Goals must be an integer",
      },
    },

    awayGoals: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
      validate: {
        validator: (value) => Number.isInteger(value),
        message: "Goals must be an integer",
      },
    },

  },

  { timestamps: true }
);

// 👇 indice para ayuar a buscar por user... y unificar la relacion
predictSchema.index(
  { user: 1, match: 1 },
  { unique: true }
);

// indice para ayuar a buscar por match
predictSchema.index({ match: 1 });

export default mongoose.model( 'Predict' , predictSchema)