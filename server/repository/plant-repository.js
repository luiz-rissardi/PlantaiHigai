
import { RepositoryException } from "../Exceptions/repositoryException.js";


export class PlantRepository {
    #model;
    constructor({ model }) {
        this.#model = model;
    }

    //return a streans of data base plants
    async findAll() {
        try {
            const query = { isActive: true }
            const stream = await this.#model.find(query).cursor();
            return stream;
        } catch (error) {
            throw new RepositoryException(`não foi possivel buscar os dados das plantas`);
        }
    }

    async findOne(namePlant) {
        try {
            const query = {
                $and: [
                    {
                        $or: [
                            { popularName: { $regex: namePlant } },
                            { scientificName: { $regex: namePlant } }
                        ]
                    },
                    { isActive: true }
                ],

            }
            const results = await this.#model.find(query);
            return results
        } catch (error) {
            throw new RepositoryException(`não foi possivel buscar os dadaos das plantas`);
        }
    }

    async insertOne(PlantModel) {
        try {
            const result = await this.#model.insertMany(PlantModel)
            return result;
        } catch (error) {
            throw new RepositoryException(`não foi possivel inserir dados no banco de dados`);
        }
    }

    async updateOne(PlantModel) {
        try {
            const filter = {
                _id: PlantModel._id
            }
            const result = await this.#model.updateOne(filter, { $set: PlantModel });
            return result;
        } catch (error) {
            throw new RepositoryException(`não foi possivel atualizar os dados`)
        }
    }
}
