import mongoose from "mongoose"

const matchdaySchema = new mongoose.Schema({

    number: { 
        type: Number, 
        min: 1, 
        max: 99, 
        required: true  
    },

    date : {
        type: Date,
        //required: true,
        default: Date.now
    },

    championship: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Championship",
          required: true,
    },
    
}, 
{
    timestamps: true // agrega createdAt y updatedAt automáticamente
})

export default mongoose.model( 'Matchday' , matchdaySchema)