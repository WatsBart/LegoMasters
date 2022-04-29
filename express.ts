//code afkomstig van het vak Webontwikkeling

const express = require('express');
const app = express();
const ejs = require('ejs');
const axios = require('axios');
const mysql = require('mysql');
app.set('view engine', 'ejs');
app.set('port', 3000);
app.use(express.static('views'));


var db_data: any;
var figdata: any;
var db_dataBekijken: any;

var db = mysql.createConnection({
    host: 'db4free.net',
    user: 'yaba_it_project',
    password: 'yaba_it_project',
    database: 'yaba_it_project'
});


db.connect((err: any) => {
    if (err) throw err;
    console.log('Database is connected successfully');
});

db.query("select * from `Bekijken`", (err: any, results: any) => {
    if (err) console.log("can't connect");
    db_data = results;
    let figIds = db_data[0].fig_id.toString();
//     for (let teller = 0; teller<figIds.length;teller++) {
//         let dezeId = figIds[teller].toString();
//     for (var i = dezeId.length; i < 6; i++) {
//         dezeId = "0" + dezeId;
//     }
//     figIds[teller] = dezeId;
// }
    console.log(figIds);
    //for (let i = 0; i<figIds.length; i++) {
        db_dataBekijken = axios.get(`https://rebrickable.com/api/v3/lego/minifigs/fig-${figIds}/?key=3ef36135e7fda4370a11fd6191fef2af`).
        then(function (response: any) {
            console.log(response);
            return response.data;
        })
        
    //}
})

// db.query("select * from `Bekijken`", (err: any, results: any) => {
//     if (err) console.log("can't connect");
//     db_dataBekijken = results;
//     // let bekijkenHtml = document.getElementById('bekijkenTabel');
//     // bekijkenHtml?.insertAdjacentHTML('beforeend', `<tr>
//     // <td><img src="${db_dataBekijken[0].afbeelding_minifig}"></td>
//     // <td>${db_dataBekijken[0].code_minifig}</td>
//     // <td><img src="${db_dataBekijken[0].afbeelding_set}"></td>
//     // <td>${db_dataBekijken[0].code_set}</td>
//     // </tr>`);
//     // bekijkenHtml?.insertAdjacentHTML('beforeend', "</table>");
// })

app.get('/', (req: any, res: any) => {
    res.render('index')
});

app.get('/index.html', (req: any, res: any) => {
    res.render('index');
})

app.get('/informatie.html', (req: any, res: any) => {
    res.render('informatie');
})

app.get('/bekijken.html', (req: any, res: any) => {
    res.render('bekijken', {dataBekijken: db_dataBekijken});
})

app.get('/blacklist.html', (req: any, res: any) => {
    res.render('blacklist');
})

app.get('/ordenen.html', (req: any, res: any) => {
    res.render('ordenen');
})

app.listen(app.get('port'),
    () => console.log('[server] http://localhost:' + app.get('port')));
    