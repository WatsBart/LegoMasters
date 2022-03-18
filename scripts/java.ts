const readline = require("readline-sync");
const axios = require('axios');

//const figApi:string = await axios.get("https://rebrickable.com/api/v3/lego/minifigs/?key=3ef36135e7fda4370a11fd6191fef2af");
//const setsApi:string = await axios.get("https://rebrickable.com/api/v3/lego/sets/?key=3ef36135e7fda4370a11fd6191fef2af");

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

function randomIntFromInterval(min:number, max:number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//van stackoverflow: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript

async function main() {
    let zoekOpdracht: string = readline.question("Zijn er nog minifigs om te ordenen? ");
    const figApi = await axios.get(`https://rebrickable.com/api/v3/lego/minifigs/?key=3ef36135e7fda4370a11fd6191fef2af`);

    let miniFigs: Fig[] = figApi.data.results;
    let tenFigs: Fig[] = [];

    for (let i = 0; i < 10; i++) {
        tenFigs[i] = miniFigs[randomIntFromInterval(0, miniFigs.length)];
    }
    console.log(tenFigs);
}
main();

export { };