const redenAanpassen = (id) => {
    console.log("reden aanpassen");
    console.log(id);
    let htmlReden = document.getElementById("r"+id);
    let reden = htmlReden.value.toString();
    console.log(reden);
    let htmlFig = document.getElementById("i"+id);
    let figId = htmlFig.innerHTML;
    console.log(figId);

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        console.log('hallo');
    }
    xhttp.open("GET", "databaseChange?figId=" + figId + "&reden=" + reden);
    xhttp.send();
}

const verwijder = (id) => {
    console.log("verwijder");
    console.log(id);
    const xhttp = new XMLHttpRequest();

    let htmlFig = document.getElementById("i"+id);
    let figId = htmlFig.innerHTML;
    console.log(figId);
    xhttp.onload = function () {
        console.log('hallo');
    }
    xhttp.open("GET", "databaseDelete?figId=" + figId);
    xhttp.send();
}