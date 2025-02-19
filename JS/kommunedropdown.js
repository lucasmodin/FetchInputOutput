const urlKommune = "https://api.dataforsyningen.dk/kommuner";
const pbFetchKommuner = document.getElementById("pbFetchKommuner")
const dropDown = document.getElementById("ddKommuner")
const bdy = document.querySelector("body")

//map til at indeholde kommunekoder
const kommuneMap = new Map();


function fetchKommuner(any) {
    return fetch(any).then(response => response.json())
}

/* fremgangsmåde:
hent data fra API (linje 19)
loop igennem hvert kommune objekt fra JSON (linje 22)
lav <option> elementer og sæt value samt ændre text-content til brugeren (linje 25 og 26)
tilføj <option> elementet til dropdown (linje 28)
 */
async function actionFetch() {
    const kommuner = await fetchKommuner(urlKommune)
    //sort funktion med hjælp fra Chatty - sorterer arrayet inden vi looper igennem
    //localeCompare håndterer også Æ, Ø, Å osv.
    kommuner.sort((a, b) => a.navn.localeCompare(b.navn));

    //loop igennem hver kommune og indsæt i map med key (kommune.kode) og value (kommune objekt) - dette gør vi ikke skal loop igennem arrayet hver gang
    kommuner.forEach(kommune => kommuneMap.set(kommune.kode, kommune));

    console.log(kommuner)
    kommuner.forEach(kommune => {
        const option = document.createElement("option");
        option.value = kommune.kode
        option.textContent = kommune.navn
        dropDown.appendChild(option)
    });

}

//funktion til at generere link til kommunerne
function generateLink(kommune) {
    //et section element til at holde links
    const linkContainer = document.getElementById("linkContainer")

    //tjekker om der findes et kommune objekt, og kan dernæst generere link tags med href og navn
    if(kommune) {
        const link = document.createElement("a")
        link.href = `https://api.dataforsyningen.dk/kommuner/${kommune.kode}`
        link.textContent = `Gå til ${kommune.navn}`
        linkContainer.appendChild(link)
    }

}


//eventListener med typen "change" som tjekker efter man vælger et <select> tag
//laver herefter opslag i kommunemap og kalder på generateLink funktionen
dropDown.addEventListener("change", function () {
    const selectedKommune = kommuneMap.get(dropDown.value);
    generateLink(selectedKommune)
})

pbFetchKommuner.addEventListener("click", actionFetch)