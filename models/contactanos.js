import mongoose from "mongoose";

const contactanosSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim: true,
        unique: false
    },
    edad:{
        type: Number,
        required:true,
        trim: true,
        unique: false
    }
})

export default mongoose.model("contactanos", contactanosSchema)