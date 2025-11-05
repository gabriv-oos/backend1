import mongoose from "mongoose";
import 'dotenv/config'

export async function conectarDB() {
    try{
        const conexion = await mongoose.connect(process.env.SECRET_MONGO)
        console.log("Conexión establecida con mongo Atlas")
    }
    catch(err){
        console.log("Error "+err)
    }
}

export async function mostrarContactos() {
    try{

    }
    catch(err){
        console.log("Error "+err)
    }
}

export default conectarDB