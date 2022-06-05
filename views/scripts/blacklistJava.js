const redenAanpassen = (id) => {
    let htmlReden = document.getElementById("r"+id);
    let reden = htmlReden.value.toString();
    let htmlFig = document.getElementById("i"+id);
    let figId = htmlFig.innerHTML;

    document.getElementById("reden"+id).innerHTML = reden;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
    }
    xhttp.open("GET", "databaseChange?figId=" + figId + "&reden=" + reden);
    xhttp.send();
}

const verwijder = (id) => {
    const xhttp = new XMLHttpRequest();

    let htmlFig = document.getElementById("i"+id);
    let figId = htmlFig.innerHTML;
    xhttp.onload = function () {
    }
    xhttp.open("GET", "databaseDelete?figId=" + figId);
    xhttp.send();
    document.getElementById("row"+id).innerHTML="";
}