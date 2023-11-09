import { getAll,inactiveCatalog,updateCatalog } from "../../services/httpRequest-service.js";
import { rendererCatalogs } from "../../utils/functions.js";

const [description, scientificName, YearCatalog, popularName] = ["description", "scientificName", "YearCatalog", "popularName"].map(el => {
    return document.getElementById(el);
});

(async () => {
    const stream = await getAll();
    let catalogs = [];
    await stream
        .pipeThrough(new TextDecoderStream())
        .pipeTo(new WritableStream({
            write(chunk, controller) {
                let arr = JSON.parse(chunk);
                arr = arr.map(el => JSON.parse(el));
                catalogs = arr;
                rendererCatalogs(arr);
            }
        }));
    mapButtonsInactive(catalogs);
    mapButtonsUpdate(catalogs);

})();

export const mapButtonsUpdate = async (catalogs) => {
    const modal = document.getElementById("modalUpdateInCatalog")
    catalogs.forEach(catalog => {
        const btn = document.getElementById(`catalogUpdate-${catalog._id || catalog.scientificName}`);
        btn.addEventListener("click", async () => {
            window.parent.$(modal).modal('show');
            description.value = catalog["description"];
            popularName.value = catalog["popularName"];
            scientificName.value = catalog["scientificName"];
        });
    })
}


export const mapButtonsInactive = (catalogs,isPost=false) => {
    catalogs.forEach(catalog => {
        const btn = document.getElementById(`catalog-${catalog._id || catalog.scientificName}`);
        btn.addEventListener("click", async () => {
            const { message } = await inactiveCatalog(catalog);
            const catalogsAfterRemove = removeCatalog(catalog, catalogs,isPost);
            rendererCatalogs(catalogsAfterRemove);
            mapButtonsInactive(catalogsAfterRemove);
            mapButtonsUpdate(catalogsAfterRemove);
            alert(message);
        });
    })
}

const removeCatalog = (catalog, catalogs,isPost = false) => {
    if(isPost == false){
        return catalogs.filter(el => el._id !== catalog._id);
    }else{
        const id = plant.scientificName;
        document.getElementById(`catalogCard-${id}`).style.display = "none"
    }
}

const putCatalog = async () => {
    try {
        const plant = getData();
        if(validData(plant)){
            const data = await updateCatalog(plant);
            const id = plant.scientificName;
            document.getElementById(`catalogCard-${id}`).style.display = "none"
            rendererCatalogs([plant],true);
            mapButtonsInactive([plant],true);
            mapButtonsUpdate([plant]);
            alert(data.message);
        }else{
            alert("dados inválidos!")
        }
    } catch (error) {
        console.log(error);
        alert("não foi possivel atualizar catalogo");
    }
}

$("#updateCatalog").click(putCatalog)

const validData = (plant) =>{
    let isValid = true;
    Object.keys(plant).forEach(key => {
        if (plant[key] == "") isValid = false;
    })
    return isValid
}

const getData = () => {
    return {
        popularName: popularName.value,
        YearCatalog: YearCatalog.value,
        scientificName: scientificName.value,
        description: description.value,
        isActive: true
    };
}