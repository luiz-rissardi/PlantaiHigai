import { Readable, Writable,Transform } from "stream";
import { pipeline } from "stream/promises";


export class PlantController {
    #service;
    constructor({ service }) {
        this.#service = service;
    }


    //ok
    async getAllPlant(request, response) {
        try {
            const stream = await this.#service.getAllPlants();

            await pipeline(
                Readable
                    .from(jsonToString(stream)),
                groupBy(Infinity),
                response
            )
            
        } catch (error) {
            console.log(error)
            response.writeHead(500);
        }
        finally {
            response.end();
        }
    }

    //ok
    async getOnePlant(request, response) {
        try {
            const { namePlant } = request.params;
            const result = await this.#service.getOnePlants(namePlant);
            response.json(result);
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    //test
    async insertPlant(request, response) {
        try {
            const plant = request.body;
            const data = await this.#service.createPlant(plant);
            response.json(data)
        } catch (error) {
            console.log(error)
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    //test
    async updateOnePlant(request, response) {
        try {
            const plant = request.body;
            const result = await this.#service.updatePlant(plant);
            console.log(result);
            response.json(result)
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async inactiveOnePlant(request, response) {
        try {
            const { plant } = request.body;
            const result = await this.#service.inactivePlant(plant);
            response.json(result);
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }
}

async function* jsonToString(stream) {
    for await (let data of stream) {
        yield JSON.stringify(data)
    }
    return;
}


function groupBy(sizeOfGroup) {
    let group = [];
    return new Transform({
        writableObjectMode: true,
        transform(chunk, encoding, callback) {
            group.push(chunk);
            if (group.length === sizeOfGroup) {
                this.push(JSON.stringify(group));
                group = [];
            }
            callback();
        },
        flush(callback) {
            if (group.length > 0) {
                this.push(JSON.stringify(group));
            }
            callback();
        }
    });
}