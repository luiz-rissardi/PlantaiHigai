
import { postCatalog,inactiveCatalog } from "../../services/httpRequest-service.js";
import { rendererCatalogs } from "../../utils/functions.js";

const [popularName, YearCatalog, scientificName, description] = ["popularName", "YearCatalog", "scientificName", "description"]
    .map(el => document.getElementById(el));

const buttonSaveNewCatalog = document.getElementById("saveNewCatalog");
const container = window.parent.document.getElementById("flowerContent").contentDocument.getElementById("flowers")


buttonSaveNewCatalog.addEventListener("click", async () => {
    try {
        const plant = getData();
        if (validData(plant)) {
            const data = await postCatalog(plant);
            await rendererCatalogs([plant],true,container);
            mapButtonsUpdate([plant]);
            mapButtonsInactive([plant]);
            alert(data.message);
        }else{
            alert("dados inválidos")
        }
    } catch (error) {
        console.log(error);
        alert("não foi possivel criar catalogo");
    }
})

export const validData = (plant) => {
    let isValid = true;
    Object.keys(plant).forEach(key => {
        if (plant[key] == "") isValid = false;
    })
    return isValid
}

export const mapButtonsUpdate = async (catalogs) => {
    const modal = document.getElementById("modalUpdateInCatalog")
    catalogs.forEach(catalog => {
        const iframe = window.parent.document.getElementById("flowerContent")
        const iframeContent = iframe.contentDocument;
        const id = catalog._id || catalog.scientificName

        const btn = iframeContent.getElementById(`catalogUpdate-${id}`);
        btn.addEventListener("click", async () => {
            window.parent.$(modal).modal('show');
            description.value = catalog["description"];
            popularName.value = catalog["popularName"];
            scientificName.value = catalog["scientificName"];
        });
    })
}


export const mapButtonsInactive = (catalogs) => {
    catalogs.forEach(catalog => {
        const iframe = window.parent.document.getElementById("flowerContent");
        const iframeContent = iframe.contentDocument;
        const id = catalog._id || catalog.scientificName
        const btn = iframeContent.getElementById(`catalog-${id}`);
        btn.addEventListener("click", async () => {
            const { message } = await inactiveCatalog(catalog);
            const catalogsAfterRemove = removeCatalog(catalog, catalogs);
            console.log(catalogs);
            rendererCatalogs(catalogsAfterRemove,false,iframeContent.getElementById("flowers"));
            mapButtonsInactive(catalogsAfterRemove);
            mapButtonsUpdate(catalogsAfterRemove);
            alert(message);
        });
    })
}

const removeCatalog = (catalog, catalogs) => {
    return catalogs.filter(el => el._id !== catalog._id);
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