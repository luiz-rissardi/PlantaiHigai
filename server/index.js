import express from "express";
import http from "http";
import cors from "cors";
import { config } from "dotenv"


import { CatalogMongoDb } from "./data/database.js";
import { PlantFactory } from "./factory/plantFactory.js";
import { createRoutes } from "./routes.js";
import { bodyParse } from "./bodyParser.js";


config();


class API {
    async initApp() {
        const app = express();

        const server = http.createServer(app);
        app.use(cors());

        const database = new CatalogMongoDb({ connectionString: "mongodb+srv://rissardiluiz2006:LvlPUFGf1mLsL3V2@stream.6v3eenw.mongodb.net/usuario" });
        await database.connect();

        await this.#configDepdencies(app);

        server.listen(5437, () => {
            console.log(`Servidor rodando na porta 5437`);
        })
    }

    async #configDepdencies(app) {
        const controller = PlantFactory.createInstance();
        app.use("/api",bodyParse, createRoutes(controller));
    }
}

async function master() {
    const obj = {
        YearCatalog: 1978,
        popularName: "beijo japones",
        scientificName: "monaco",
        description: "um simple steste para essa planta ",
        geneticModifications: true
    }
    const data = await fetch("http://localhost:5437/api/createNewCatalog", {
        method: "post",
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify({plant:obj})
    })
}

const api = new API();
api.initApp();
