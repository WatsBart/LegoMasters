//minifigs
fetch(`https://rebrickable.com/api/v3/lego/minifigs/?key=3ef36135e7fda4370a11fd6191fef2af`).
then(function (response) {
    if (response.ok) {
        return response.json();
    }else {
        return Promise.reject(response.status);
    }
}).then(function (response) {
        console.log(response);
        let miniFigs = response.results;
        let figList = [];

    for (let i = 0; i < 10; i++) {
        figList[i] = miniFigs[Math.floor(Math.random()*miniFigs.length)];
    }
    console.log(figList);
    let miniFigHtml = document.getElementById("miniFigs");
    for (let i = 0; i<figList.length;i++) {
        miniFigHtml.insertAdjacentHTML("beforeend", `<img src="${figList[i].set_img_url}">`);
        //miniFigHtml.insertAdjacentHTML("beforeend", `<p>${figList[i].name}</p>`);
    }
})
//sets
fetch(`https://rebrickable.com/api/v3/lego/sets/?key=3ef36135e7fda4370a11fd6191fef2af`).
then(function (response) {
    if (response.ok) {
        return response.json();
    }else {
        return Promise.reject(response.status);
    }
}).then(function (response) {
        console.log(response);
        let figSets = response.results;
        let setList = [];

    for (let i = 0; i < 10; i++) {
        setList[i] = figSets[Math.floor(Math.random()*figSets.length)];
    }
    console.log(setList);
    let figSetHtml = document.getElementById("figSets");
    for (let i = 0; i<setList.length;i++) {
        figSetHtml.insertAdjacentHTML("beforeend", `<img src="${setList[i].set_img_url}">`);
        //figSetHtml.insertAdjacentHTML("beforeend", `<p>${setList[i].name}</p>`);
    }
})