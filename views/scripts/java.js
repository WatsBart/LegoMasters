//minifigs
fetch(`https://rebrickable.com/api/v3/lego/minifigs/?key=3ef36135e7fda4370a11fd6191fef2af&page_size=9999`).
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

        let numberarray = [];
        for(let i = 0; i < 6; i++){
            randomgetal = Math.floor(Math.random()*miniFigs.length);
            if(!numberarray.includes(randomgetal)){
                numberarray.push(randomgetal);
            }
        }

        for (let i = 0; i < 6; i++) {
            figList[i] = miniFigs[numberarray[i]-1];
        }

    let miniFigHtml = document.getElementById("miniFigs");
    for (let i = 0; i<figList.length;i++) {
        miniFigHtml.insertAdjacentHTML("beforeend", `<img src="${figList[i].set_img_url}">`);
        miniFigHtml.insertAdjacentHTML("beforeend", `<p class="naam">${figList[i].name}</p>`);
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

        let numberarray = [];
        for(let i = 0; i < 6; i++){
            randomgetal = Math.floor(Math.random()*figSets.length);
            if(!numberarray.includes(randomgetal)){
                numberarray.push(randomgetal);
            }
        }

        for (let i = 0; i < 6; i++) {
            setList[i] = figSets[numberarray[i]-1];
        }

    console.log(setList);
    let figSetHtml = document.getElementById("figSets");
    for (let i = 0; i<setList.length;i++) {
        figSetHtml.insertAdjacentHTML("beforeend", `<img src="${setList[i].set_img_url}">`);
        figSetHtml.insertAdjacentHTML("beforeend", `<p class="naam">${setList[i].name}</p>`);
    }
})