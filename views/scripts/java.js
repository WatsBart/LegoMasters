//minifigs
console.log("java");

let minifigs;

const aantalKiezenHtml = document.getElementById("aantal");
aantalKiezenHtml.insertAdjacentHTML("beforeend", '<input type="number" name="aantal" id="aantalKiezen" min="1"> <button type="button" onclick=aantalKiezen()>Submit</button>');
let aantalFigs;

fetch(`https://rebrickable.com/api/v3/lego/minifigs/?key=3ef36135e7fda4370a11fd6191fef2af`).
    then(function (response) {
        return response.json();
        if (response.ok) {
        } else {
            return Promise.reject(response.status);
        }
    }).then(function (response) {
        console.log(response);
        console.log("fig");
        miniFigs = response.results;
        console.log(miniFigs);
})

//code afkomstig van w3schools

const tonen = () => {
    console.log("tonen");
    let random = Math.floor(Math.random() * 100); //10999
    console.log(random);
    let miniFigHtml = document.getElementById("miniFigs");
    miniFigHtml.insertAdjacentHTML("beforeend", `<td><img src="${miniFigs[random].set_img_url}"></td>`);
    miniFigHtml.insertAdjacentHTML("beforeend", `<td><p class="naam">${miniFigs[random].name}</p><p id="figId">${miniFigs[random].set_num}</p></td>`);
    fetch(`https://rebrickable.com/api/v3/lego/minifigs/${miniFigs[random].set_num}/sets/?key=3ef36135e7fda4370a11fd6191fef2af`)
        .then(function (response) {
            return response.json();
            if (response.ok) {
            } else {
                return Promise.reject(response.status);
            }
        })
        .then(function (response) {

            let sets = response.results;
            console.log("list: ");
            console.log(sets);


            let setsHtml = document.getElementById("figSets");

            for (let i = 0; i < sets.length; i++) {
                let id = sets[i].set_num.split("-");

                console.log(id);
                setsHtml.insertAdjacentHTML("beforeend", `<td><button onclick=ordenen(${i})><img src="${sets[i].set_img_url}"></button></td>`);
                setsHtml.insertAdjacentHTML("beforeend", `<td><p class="naam">${sets[i].name}</p><p id="${i}">${sets[i].set_num}</p></td>`);
            }


        })
    blackListHtml = document.getElementById("blackList");
    blackListHtml.insertAdjacentHTML("beforeend",`<td><input type="text" id="reden"><button onclick=blacklistFig()>Blacklist</button></td>`)

}

const aantalKiezen = () => {
    aantalFigs = parseInt(document.getElementById("aantalKiezen").value) - 1;
    console.log(aantalFigs);
    document.getElementById("aantal").innerHTML = "";
    tonen();
}

const ordenen = (id) => {
    let ordenenHtml = document.getElementById(id);
    let setId = ordenenHtml.innerHTML;

    let buttons = document.getElementsByTagName("button");
    let setImg = buttons[id].getElementsByTagName("img");
    setImgUrl = setImg[0].src;
    
    let ordenenHtmlFig = document.getElementById("figId");
    let figId = ordenenHtmlFig.innerHTML;
    let figImg = document.getElementById("miniFigs").getElementsByTagName("img");
    let figImgUrl = figImg[0].src;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        console.log('hallo');
    }
    xhttp.open("GET", "databaseInsert?figId=" + figId + "&figUrl=" + figImgUrl + "&setId=" + setId + "&setUrl=" + setImgUrl + "&reden=" + "");
    xhttp.send();
    document.getElementById("miniFigs").innerHTML = "";
    document.getElementById("figSets").innerHTML = "";
    document.getElementById("blackList").innerHTML = "";
    if (aantalFigs > 0) {
        aantalFigs--;
        tonen();
    } else {
        aantalKiezenHtml.insertAdjacentHTML("beforeend", '<input type="number" name="aantal" id="aantalKiezen" min="1"> <button type="button" onclick=aantalKiezen()>Submit</button>');
    }
}


const blacklistFig = () => {
    let htmlFig = document.getElementById("figId");
    let figId = htmlFig.innerHTML;
    let htmlReden = document.getElementById("reden");
    let reden = htmlReden.value.toString();

    let figImg = document.getElementById("miniFigs").getElementsByTagName("img");
    let figImgUrl = figImg[0].src;

    console.log(htmlReden.value);
    console.log(reden.toString());
    console.log("blacklistfig");

    var params = "figId=" + figId + "&figUrl=" + figImgUrl + "&setId=" + "" + "&setUrl=" + "" + "&reden=" + reden;
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ordenen", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onload = function () {
        console.log("Toegevoegd aan blacklist");
    }
    xhttp.send(params);

    document.getElementById("miniFigs").innerHTML = "";
    document.getElementById("figSets").innerHTML = "";
    document.getElementById("blackList").innerHTML = "";
    if (aantalFigs > 0) {
        aantalFigs--;
        tonen();
    } else {
        aantalKiezenHtml.insertAdjacentHTML("beforeend", '<input type="number" name="aantal" id="aantalKiezen" min="1"> <button type="button" onclick=aantalKiezen()>Submit</button>');
    }
}