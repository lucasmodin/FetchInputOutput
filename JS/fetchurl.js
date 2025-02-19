console.log("im in fetchUrl")

const btnFetchUrl = document.getElementById("pbFetchUrl")
const inpUrl = document.getElementById("inpUrl")
const textArea = document.getElementById("txt")

async function actionFetchUrl(btn) {
    const url = inpUrl.value
    console.log(url)
    const jsonOutput = await fetchAnyUrl(url)

    let showTxt = ""
    if (Array.isArray(jsonOutput)) {
        showTxt = getKeysAndValuesFromObj(jsonOutput[0])
    } else {
        showTxt = getKeysAndValuesFromObj(jsonOutput)
    }
    textArea.textContent = showTxt
    console.log(jsonOutput)
}

function fetchAnyUrl(url) {
    console.log("inside fetch url=" + url)
    return fetch(url).then(response => response.json())
}


//antager at der er et array af objekter (ellers virker det ikke!)
//herefter antages der, at der er en attribut(property?) kaldet 'kode' i et region objekt
//Til sidst laver den en string med formatet: {"region": "kode"}
function convertJsonToText2(json) {
    const txt = json.map(region => `{"region": "${region.kode}"}`).join(',');
    return txt
}

//viser alle properties/keys for det første objekt
function getKeysAndValuesFromObj(obj) {
    const keys = Object.keys(obj)
    return keys.map(key => `${key} : ${obj[key]}`)
}


btnFetchUrl.addEventListener("click", actionFetchUrl)