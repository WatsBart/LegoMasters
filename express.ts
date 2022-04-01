//code afkomstig van het vak Webprogrammeren

const express = require('express');
const app = express();
const ejs = require('ejs');
const axios = require('axios');
const mysql = require('mysql');
app.set('view engine', 'ejs');
app.set('port', 3000);
app.use(express.static('views'));

/*
var db_data: any;
var figdata: any;

var db = mysql.createConnection({
    host: 'sql11.freesqldatabase.com',
    user: 'sql11481004',
    password: 'PSkdDGHXuh',
    database: 'sql11481004'
});


db.connect((err: any) => {
    if (err) throw err;
    console.log('Database is connected successfully');
});

db.query("select * from `EersteTabel`", (err: any, results: any) => {
    if (err) console.log("can't connect");
    db_data = results;
    let eersteId = db_data[0].Id;
    eersteId = eersteId.toString();
    for (var i = eersteId.length; i < 6; i++) {
        eersteId = "0" + eersteId;
    }
    console.log(eersteId);
    let fig = axios.get(`https://rebrickable.com/api/v3/lego/minifigs/fig-${eersteId}/?key=3ef36135e7fda4370a11fd6191fef2af`).
        then(function (response:any) {
            if (response.ok) {
                console.log(response.json);
                return response.json();
            } else {
                console.log("rejected");
                return Promise.reject(response.status);
            }
        })
    console.log(fig);
    figdata = fig;
})
*/

app.get('/index.html',(req:any,res:any)=>{
    res.render('index')
});

app.get('/index.html', (req: any, res: any) => {
    res.render('index');
})

app.get('/informatie.html', (req: any, res: any) => {
    res.render('informatie'/*, { data: db_data }*/);
})

app.get('/contact.html', (req: any, res: any) => {
    res.render('contact');
})


app.listen(app.get('port'),
    () => console.log('[server] http://localhost:' + app.get('port')));