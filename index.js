import express from "express";
import rutas from "./rutas/rutas.js";
import {conectarDB} from "./bd/bd.js";

async function iniciarServidor() {
    try {
        await conectarDB();

        const app = express();

        app.use(express.urlencoded({ extended: true }));
        app.set("view engine", "ejs");
        app.use("/", rutas);

        app.use((req, res, next) => {
            res.status(404).render("404");
        });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log("Servidor en http://localhost:" + PORT);
        });

    } catch (err) {
        console.error("Error al conectar con la base de datos:", err);
        process.exit(1);
    }
}

iniciarServidor();