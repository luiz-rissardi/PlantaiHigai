



export async function postCatalog(plant) {
    try {
        const data = await fetch("http://localhost:5437/api/createNewCatalog", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plant)
        })
        const result = await data.json();
        return result;

    } catch (error) {
        throw new Error("não foi possivel inserir o novo catalogo!!!");
    }
}


export async function getAll() {
    try {
        const data = await fetch("http://localhost:5437/api/getAll", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });
        const stream = data.body
        return stream;
    } catch (error) {
        console.log(error)
        throw new Error("não foi possivel buscar todos os dados")
    }
}

export async function getPerName(namePlant) {
    try {
        if(namePlant !== ""){
            const data = await fetch(`http://localhost:5437/api/getPerName/${namePlant}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            })
            const stream = data.body;
            return stream
        }
        return getAll();
    } catch (error) {
        console.log(error);
        throw new Error("não foi possivel buscar pelo nome")
    }
}

export async function inactiveCatalog(plant){
    try {
        const data = await fetch("http://localhost:5437/api/inactiveCatalog", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({plant})
        })
        const result = await data.json();
        return result;

    } catch (error) {
        throw new Error("não foi possivel inativar o catalogo!!!");
    }
}

export async function updateCatalog(plant){
    try {
        const data = await fetch("http://localhost:5437/api/updateCatalog", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plant)
        })
        const result = await data.json();
        return result;

    } catch (error) {
        throw new Error("não foi possivel atualizar o catalogo!!!");
    }
}