
let catalogFlowers = []

export const rendererCatalogs = async (catalogs, isPost=false ,container = window.document.getElementById("flowers")) => {
    if(isPost == false){
        container.innerHTML = ""
        catalogFlowers.length = 0
    }

    catalogFlowers = catalogs;
    catalogs.forEach(catalog => {
        const description = formatDescription(catalog.description);
        const id = catalog._id || catalog.scientificName;
        const html = `
        <div class="card-flower" id="catalogCard-${catalog.scientificName}">
            <div class="card-header">
                <div class="d-block">
                    <p>popular Name</p>
                    <h2> ${catalog.popularName}  </h2>
                </div>
                <div class="ms-auto d-flex">
                    <button type="button" class="btn btn-danger my-5" id="catalog-${id}"> <i class="fi fi-rr-trash-xmark"></i> </button>
                    <button type="button" class="btn btn-secondary my-5 mx-2" id="catalogUpdate-${id}"> <i class="fi fi-rr-pencil"></i> </button>
                </div>
            </div>
            <div class="card-body d-flex justify-content-center row">
                <article class="d-block col-sm-7 col-12 my-1 m-auto">
                    <p>description</p>
                    <p>
                       ${description}
                    </p>
                </article>
                <article class="d-block col-sm-4 col-12 ms-1 text-center">
                    <div class="d-block">
                        <p> scientific name </p>
                        <p style="font-size: 0.9rem;"> ${catalog.scientificName} </p>
                    </div>
                    <hr>    
                    <div class="d-block">
                        <p> Year of catalog </p>
                        <p> ${formatDate(catalog.YearCatalog)} </p>
                    </div>
                </article>
            </div>
        `
        container.innerHTML += html;
    })
}



export function inactiveOneCatalog(indexCatalog) {
    const catalog = catalogFlowers[indexCatalog];
    console.log(catalog);
}

const formatDescription = (description) => {
    const formatedDescription = formatString(description);
    const maxWords = 20;
    let formated = '';
    formatedDescription.forEach((words, i) => {
        if (i <= maxWords) {
            formated += " " + words;
        } else {
            formated += "<a href='#'> Ler mais ...<a>"
        }
    })
    return formated;
}

const formatString = (string) => {
    return string.replace(/\s+/g, " ").split(" ")
}

const formatDate = (date) => {
    return Intl.DateTimeFormat("pt-br", {
        "dateStyle": "short"
    }).format(new Date(date))
}
