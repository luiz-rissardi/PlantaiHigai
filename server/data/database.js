import { connect } from "mongoose";

export class CatalogMongoDb{
    #connectionString;
    constructor({ connectionString }){
        this.#connectionString = connectionString;
    }

    async connect(){
        try {
            const connection = await connect(this.#connectionString);
            return connection;
        } catch (error) {
            console.log(error);
            throw new Error(error.message)
        }
    }
}