//minifigs
console.log("java");

let minifigs;

const aantalKiezenHtml = document.getElementById("aantal");
aantalKiezenHtml.insertAdjacentHTML("beforeend", '<input type="number" name="aantal" id="aaantalKiezen"> <button type="button" onclick=aantalKiezen()>Submit</button>');

// let random = Math.floor(Math.random() * 10999);
// console.log(random);
// let id = random.toString();
// for (var i = id.length; i < 6; i++) {
//     id = "0" + id;
// }
// console.log(id);

fetch(`https://rebrickable.com/api/v3/lego/minifigs/?key=3ef36135e7fda4370a11fd6191fef2af`).
then(function (response) {
    return response.json();
    if (response.ok) {
    }else {
        return Promise.reject(response.status);
    }
}).then(function (response) {
        console.log(response);
        console.log("fig");
        miniFigs = response.results;
        console.log(miniFigs);
        // let figList = [];
        // let numberarray = [];
        // for(let i = 0; i < 6; i++){
        //     randomgetal = Math.floor(Math.random()*miniFigs.length);
        //     if(!numberarray.includes(randomgetal)){
        //         numberarray.push(randomgetal);
        //     }
        // }

        // for (let i = 0; i < 6; i++) {
        //     figList[i] = miniFigs[numberarray[i]-1];
        // }
})


//code afkomstig van w3schools

// function showCustomer(str) {

// }

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
    }else {
        return Promise.reject(response.status);
    }
})
.then(function(response){

        let sets = response.results;
        console.log("list: ");
        console.log(sets);

        
        let setsHtml = document.getElementById("figSets");

        for (let i = 0; i<sets.length;i++) {
            let id = sets[i].set_num.split("-");

            console.log(id);
        setsHtml.insertAdjacentHTML("beforeend", `<td><button onclick=ordenen(${i})><img src="${sets[i].set_img_url}"></button></td`);
        setsHtml.insertAdjacentHTML("beforeend", `<td><p class="naam">${sets[i].name}</p><p id="${i}">${sets[i].set_num}</p></td>`);
        }


})

}

const aantalKiezen = () => {
    console.log("aantal kiezen");
    document.getElementById("aantal").innerHTML = "";
    tonen();
}


const ordenen = (id) => {
    console.log("ordenen");
    let ordenenHtml = document.getElementById(id);
    let setId = ordenenHtml.innerHTML;
    
    let ordenenHtmlFig = document.getElementById("figId");
    let figId = ordenenHtmlFig.innerHTML;
    // console.log(url);
    // console.log(id);
    // for (let teller = 1; teller<id.length; teller++) {
    //     dezeId = " - " + id[teller]; 
    // }
    // db.query("select * from `Bekijken`", (err, results) => {
    //     if (err) console.log("can't connect");
    //     console.log(results);
    // })

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        console.log('hallo');
    }
    xhttp.open("GET", "databaseInsert?figId="+figId + "&setId="+setId);
    xhttp.send();
    document.getElementById("miniFigs").innerHTML = "";
    document.getElementById("figSets").innerHTML = "";
    

}

const blacklistFig = () => {
    let htmlFig = document.getElementById("figId");
    let figId = htmlFig.innerHTML;
    let htmlReden = document.getElementById("reden");
    let reden = htmlReden.innerHTML;
    const xhttp = new XMLHttpRequest();
    var data = new FormData();
    data.append("id",figId);
    data.append("reden",reden);
    xhttp.onload = function() {

    }
    xhttp.open("POST","ordenen");
}

// //sets
// fetch(`https://rebrickable.com/api/v3/lego/sets/?key=3ef36135e7fda4370a11fd6191fef2af`).
// then(function (response) {
//     if (response.ok) {
//         return response.json();
//     }else {
//         return Promise.reject(response.status);
//     }
// }).then(function (response) {
//         console.log(response);
//         let figSets = response.results;
//         let setList = [];

//         let numberarray = [];
//         for(let i = 0; i < 6; i++){
//             randomgetal = Math.floor(Math.random()*figSets.length);
//             if(!numberarray.includes(randomgetal)){
//                 numberarray.push(randomgetal);
//             }
//         }

//         for (let i = 0; i < 6; i++) {
//             setList[i] = figSets[numberarray[i]-1];
//         }

//     console.log(setList);
//     let figSetHtml = document.getElementById("figSets");
//     for (let i = 0; i<setList.length;i++) {
//         figSetHtml.insertAdjacentHTML("beforeend", `<img src="${setList[i].set_img_url}">`);
//         figSetHtml.insertAdjacentHTML("beforeend", `<p class="naam">${setList[i].name}</p>`);
//     }
// })