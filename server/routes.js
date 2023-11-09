import { Router } from "express";


export function createRoutes(controller){
    const routes =  Router();

    routes.route("/createNewCatalog").post((req,res)=>{
        controller.insertPlant(req,res);
    })

    routes.route("/getAll").get((req,res)=>{
        controller.getAllPlant(req,res);
    })

    routes.route("/getPerName/:namePlant").get((req,res)=>{
        controller.getOnePlant(req,res);
    })

    routes.route("/updateCatalog").put((req,res)=>{
        controller.updateOnePlant(req,res);
    })

    routes.route("/inactiveCatalog").put((req,res)=>{
        controller.inactiveOnePlant(req,res);

    })

    return routes;
}

 



