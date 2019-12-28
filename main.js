function printName() {
    var myImg = document.querySelector(".app-logo");
    console.log(myImg.clientWidth, myImg.clientHeight);
    var team = document.getElementById("teams").value;
    console.log(team);
    var qtd = document.getElementById("qtd").value;
    console.log(qtd)
}

function titleize(text) {
    var result = text;
    result = result.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    return result
}

const API_URL = "https://www.potterapi.com/v1/characters?key=$2a$10$1xPbT5cXmgjOsuR.Sy0MqO.E6OcnPS8w7n9hdz0O2rgGq5kc1RMbS&name="

function buildCharacterMarkup(charater, imgname) {
    return `<div class="character-img-frame">
        <img src="https://wiki.potterish.com/images/${imgname}.jpg" alt="character"></img>
    </div>
    <div class="character-info">
        <h2>${charater.name}</h2>
        <h3>${charater.alias}</h3>
        <p>House: ${charater.house}</p>    
        <p>Wand : ${charater.wand}</p>    
        <p>Boggart : ${charater.boggart}</p>    
        <p>Patronus: ${charater.patronus}</p>    
        <p>Blood status: ${charater.bloodStatus}</p>    
        <p>Species: ${charater.human}</p>    
    </div>`
}

async function onFetchCharacter() {
    var ch_section = document.querySelector('#character-section')
    try {
        ch_section.innerHTML = null
        ch_section.style.border = null
        let name = document.querySelector('#searchedName').value
        name = titleize(name)
        const response = await fetch(API_URL+name);
        result = name.split(" ")
        if (!response.ok) {
            return
        }
        let charater = await response.json();
        console.log(charater)
        if (charater.length > 0) {
            ch_section.style.border = "3px solid black"
            ch_section.innerHTML = buildCharacterMarkup(charater[0], result[0])
        }
    } catch(err) {
        console.error(`error: ${err}`)
    }
}

async function installServiceWorkerAsync() {
    if ('serviceWorker' in navigator) {
        try {
            let serviceWorker = await navigator.serviceWorker.register('sw.js')
            console.log(`Service worker registered ${serviceWorker}`)
        } catch (err) {
            console.error(`Failed to register service worker: ${err}`)
        }
    }
}