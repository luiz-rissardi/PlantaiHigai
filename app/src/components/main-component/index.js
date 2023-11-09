import { getPerName } from "../../services/httpRequest-service.js";
import { rendererCatalogs } from "../../utils/functions.js";

const modalCreateCatalog = getModalIframeContent()
const containerFlowers = getFlowersIframeContent();

function getModalIframeContent() {
    const Iframe = document.getElementById("modalIframe");
    const contentModalIframe = Iframe.contentDocument;
    return contentModalIframe.getElementById("modalInsertInCatalog");
}

function getFlowersIframeContent() {
    const Iframe = document.getElementById("flowerContent");
    const contentModalIframe = Iframe.contentDocument;
    return contentModalIframe.getElementById("flowers");

}

let timeout = null;

$("#createCatalog").click(function () {
    OpenModal();
})

$("#hamburguerNavBtn").click(function () {
    $(this).hide()
})

$("#moreWeLink,#moreFoWe").click(() => {
    window.open("../sobre-component/index.html", "_self")
})

$("#searchFlower").on("input", () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        sendRequest();
    }, 1500);
})


$("#morePlant").click(()=>{
    window.scroll({
        top: 600,
        behavior: "smooth",
      });
})

const OpenModal = () => {
    $(modalCreateCatalog).modal("show")
}


async function sendRequest() {
    const value = $("#searchFlower").val();
    const stream = await getPerName(value);
    stream
        .pipeThrough(new TextDecoderStream())
        .pipeTo(new WritableStream({
            write(chunk, controller) {
                let arr = JSON.parse(chunk);
                arr = arr.map(el => {
                    if (typeof el == "string") {
                        return JSON.parse(el)
                    }
                    return el
                });

                containerFlowers.innerHTML = "";
                rendererCatalogs(arr,false, containerFlowers);
            }
        }));
} 