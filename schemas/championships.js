import mongoose from "mongoose"

const championshipSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },

    
    season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Season",
        required: true,
    },
    

    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    }],

    /*active: {
        type: Boolean,
        default: true
    }*/

}, 
{
    timestamps: true // agrega createdAt y updatedAt automáticamente
})

championshipSchema.index(
    { season: 1, name: 1 },
    { unique: true }
)

export default mongoose.model( 'Championship' , championshipSchema)