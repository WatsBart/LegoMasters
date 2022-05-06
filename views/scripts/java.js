//minifigs
const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'db4free.net',
    user: 'yaba_it_project',
    password: 'yaba_it_project',
    database: 'yaba_it_project'
});


db.connect((err) => {
    if (err) throw err;
    console.log('Database is connected successfully');
});

console.log("java");
let id = "fig-000051";
fetch(`https://rebrickable.com/api/v3/lego/minifigs/${id}/?key=3ef36135e7fda4370a11fd6191fef2af`).
then(function (response) {
    return response.json();
    if (response.ok) {
    }else {
        return Promise.reject(response.status);
    }
}).then(function (response) {
        console.log(response);
        console.log("fig");
        let miniFigs = response;
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

        
        let miniFigHtml = document.getElementById("miniFigs");
        miniFigHtml.insertAdjacentHTML("beforeend", `<td><img src="${miniFigs.set_img_url}"></td>`);
        miniFigHtml.insertAdjacentHTML("beforeend", `<td><p class="naam">${miniFigs.name}</p></td>`);
})

fetch(`https://rebrickable.com/api/v3/lego/minifigs/${id}/sets/?key=3ef36135e7fda4370a11fd6191fef2af`)
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
        setsHtml.insertAdjacentHTML("beforeend", `<td><button onclick=ordenen(${i})><img src="${sets[i].set_img_url}></button></td`);
        setsHtml.insertAdjacentHTML("beforeend", `<td><p class="naam">${sets[i].name}</p><p id="${i}">${sets[i].set_num}</p></td>`);
        }
})

const ordenen = (id) => {
    let ordenenHtml = document.getElementById(id);
    let url = ordenenHtml.innerHTML;
    console.log(url);
    console.log(id);
    for (let teller = 1; teller<id.length; teller++) {
        dezeId = " - " + id[teller]; 
    }
    db.query("select * from `Bekijken`", (err, results) => {
        if (err) console.log("can't connect");
        console.log(results);
    })

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