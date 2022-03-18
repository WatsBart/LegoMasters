

//const figApi:string = await axios.get("https://rebrickable.com/api/v3/lego/minifigs/?key=3ef36135e7fda4370a11fd6191fef2af");
//const setsApi:string = await axios.get("https://rebrickable.com/api/v3/lego/sets/?key=3ef36135e7fda4370a11fd6191fef2af");

/*
export interface Lego {
    count: number;
    next: string;
    previous: null;
    results: Lego[];
}

export interface Fig {
    set_num: string;
    name: string;
    num_parts: number;
    set_img_url: null | string;
    set_url: string;
    last_modified_dt: Date;
}
*/

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//van stackoverflow: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
/*
async function main() {
    //let zoekOpdracht = readline.question("Zijn er nog minifigs om te ordenen? ");
    const figApi = fetch(`https://rebrickable.com/api/v3/lego/minifigs/?key=3ef36135e7fda4370a11fd6191fef2af`)
    .then(function (response) {
        let miniFigs = response.data.results;
        let tenFigs = [];

    for (let i = 0; i < 10; i++) {
        tenFigs[i] = miniFigs[randomIntFromInterval(0, miniFigs.length)];
    }
    console.log(tenFigs);
    miniFigHtml.insertAdjacentHTML("beforeend", `<img src="${tenFigs[0].set_img_url}">`);
    }
}*/

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
        figList[i] = miniFigs[randomIntFromInterval(0, miniFigs.length)];
    }
    console.log(figList);
    let miniFigHtml = document.getElementById("miniFigs");
    for (let i = 0; i<figList.length;i++) {
        miniFigHtml.insertAdjacentHTML("beforeend", `<img src="${figList[i].set_img_url}">`);
        miniFigHtml.insertAdjacentHTML("beforeend", `<p>${figList[i].name}</p>`);
    }
})