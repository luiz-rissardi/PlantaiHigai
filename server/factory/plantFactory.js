import { PlantController } from "../controllers/plant.controller.js";
import { PlantModel } from "../models/plant-Model.js";
import { PlantRepository } from "../repository/plant-repository.js";
import { PlantService } from "../service/plant-service.js";

export class PlantFactory{
    static createInstance(){
        const repository = new PlantRepository({ model:PlantModel });
        const service = new PlantService({ repository });
        const controller = new PlantController({ service });
        return controller;
    }
}