import Contactanos from "../models/contactanos.js";

export async function contactanosNuevo({nombre, edad}){
    try{
        const contactanosObj = new Contactanos({nombre, edad});
        console.log("-----------------------------------------");
        console.log(contactanosObj);
        console.log("-----------------------------------------");
        const respuestaMongo = await contactanosObj.save();
        console.log("El registro se guardó en Mongo");
        return respuestaMongo;
    }
    catch(err){
        console.log("Error"+err);
        return null;
    }
}

export async function mostrarContactos(){
    try{
        const contactosMongo = await Contactanos.find();
        return contactosMongo;
    }
    catch(err){
        console.log("Error"+err);
        return [];
    }
}

export async function buscarNombre(nombre){
    try {
        const contactosMongo = await Contactanos.find({nombre});
        return contactosMongo;
    } catch (err) {
        console.log("Error"+err);
        return [];
    }
}

export async function buscarId(id){
    try {
        const contacto = await Contactanos.findById(id);
        return contacto;
    } catch (err) {
        console.log("Error"+err);
        return null;
    }
}

export async function editarContacto({id, nombre, edad}){
    try {
        const respuesta = await Contactanos.findByIdAndUpdate(
            id, 
            {nombre, edad},
            { new: true }
        );
        return respuesta;
    } catch (err) {
        console.log("Error"+err);
        return null;
    }
}

export async function borrarContacto(id){
    try {
        const respuesta = await Contactanos.findByIdAndDelete(id);
        return respuesta;
    } catch (err) {
        console.log("Error"+err);
        return null;
    }
}