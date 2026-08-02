import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    location: {
        type: new mongoose.Schema({
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
            googleMapsUrl: { type: String, required: true }
        }),
        required: false // cambiar
    }
},
{
    timestamps: true
});

export default mongoose.model( 'Field' , fieldSchema);