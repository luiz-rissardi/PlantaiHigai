import { ServiceException } from "../Exceptions/serviceEsception.js";

export class PlantService {

    #repository;
    constructor({ repository }) {
        this.#repository = repository;
    }

    async getAllPlants() {
        try {
            const stream = await this.#repository.findAll();
            return stream;
        } catch (error) {
            throw new ServiceException(`não foi possivel buscar os dados`)
        }
    }

    async getOnePlants(namePlant) {
        try {
            const result = await this.#repository.findOne(namePlant);
            return result;
        } catch (error) {
            throw new ServiceException(`não foi possivel buscar os dados`)
        }
    }

    async createPlant(PlantModel) {
        try {
            PlantModel.geneticModifications =  PlantModel.geneticModifications == "on"?true:false;
            await this.#repository.insertOne(PlantModel);
            return {
                type:"valid",
                message:"catalogo criado com sucesso"
            };
        } catch (error) {
            throw new ServiceException(`não foi possivel inserir os dados`)
        }
    }

    async updatePlant(PlantModel) {
        try {
            await this.#repository.updateOne(PlantModel);
            return {
                type:"valid",
                message:"catalogo atualizado com sucesso"
            };
        } catch (error) {
            throw new ServiceException(`não foi possivel atualizar os dados`)
        }
    }

    async inactivePlant(PlantModel){
        try {
            PlantModel.isActive = false;
            await this.#repository.updateOne(PlantModel);
            return {
                type:"valid",
                message:"catalogo inativado com sucesso"
            };
        } catch (error) {
            throw new ServiceException(`não foi possivel atualizar os dados`)
        }
    }

}