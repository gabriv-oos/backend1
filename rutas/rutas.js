import { Router } from "express";
import {contactanosNuevo, mostrarContactos, buscarNombre, buscarId, editarContacto, borrarContacto} from "../bd/contactanosBD.js";
const router = Router();

router.get("/", (req, res) => {
    var nombre = "ANGEL";
    var grupo = "DS01SM-24";
    var desayunos = ["QUESO", "MANGO", "HOT CAKES", "FRESA"];
    res.render("index", { nombre, grupo, desayunos });
});

router.get("/contactanos", (req, res) => {
    res.render("contactanos");
});

router.get("/usuarios", (req, res) => {
    res.render("usuarios");
});

router.get("/abc/:nombre", (req,res) => {
    var nombre = req.params.nombre;
    console.log(nombre);
    res.render("otro", { nombre });
});

router.post("/otro", async (req, res) => {
    try {
        await contactanosNuevo(req.body);
        res.redirect("/mostrar_contactos");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al crear el contacto.");
    }
});

router.get("/mostrar_contactos", async(req, res) => {
    try {
        const contactosMongo = await mostrarContactos();
        res.render("mostrar_contactos", {contactosMongo});
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al cargar los contactos.");
    }
});

router.post("/buscar", async(req, res) => {
    try {
        const buscar = req.body.buscar;
        const contactosMongo = await buscarNombre(buscar);
        console.log(contactosMongo);
        res.render("mostrar_contactos", {contactosMongo});
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al buscar contactos.");
    }
});

router.get("/editarContacto/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const contactoMongo = await buscarId(id);
        if (!contactoMongo) {
            return res.status(404).send("Contacto no encontrado.");
        }
        res.render("editarContacto", {contactoMongo});
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al buscar contacto para editar.");
    }
});

router.post("/editarContacto", async (req, res) => {
    try {
        const respuesta = await editarContacto(req.body);
        console.log(respuesta);
        res.redirect("/mostrar_contactos");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al editar el contacto.");
    }
});

router.post("/borrarContacto/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await borrarContacto(id);
        res.redirect("/mostrar_contactos");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al borrar el contacto.");
    }
});

export default router;