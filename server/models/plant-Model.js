import {Schema, model } from "mongoose"


const plantSchema = new Schema(
    {

        scientificName: {
            type: String,
            require: true,
        },

        popularName: {
            type: String,
            require: true,
        },

        YearCatalog: {
            type: Date,
            require: true,
        },

        description: {
            type: String,
            require: true,
        },
        
        isActive: {
            type: Boolean,
            require: true
        }
    }
)

const PlantModel = model("plantas", plantSchema);

export {
    PlantModel
}