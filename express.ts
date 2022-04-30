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

var db = mysql.createConnection({
    host: 'db4free.net',
    user: 'yaba_it_project',
    password: 'yaba_it_project',
    database: 'yaba_it_project'
});

/*
db.connect((err: any) => {
    if (err) throw err;
    console.log('Database is connected successfully');
});




app.get('/', (req: any, res: any) => {
    res.render('index')
});

app.get('/index', (req: any, res: any) => {
    res.render('index');
})

app.get('/informatie', (req: any, res: any) => {
    res.render('informatie');
})

app.get('/bekijken', (req: any, res: any) => {
    db.query("select * from `Bekijken`", (err: any, results: any) => {
        if (err) console.log("can't connect");
        db_data = results;
        let eersteId = db_data[0].fig_id;
        eersteId = eersteId.toString();
        for (var i = eersteId.length; i < 6; i++) {
            eersteId = "0" + eersteId;
        }
        console.log(eersteId);
        let fig = axios.get(`https://rebrickable.com/api/v3/lego/minifigs/fig-${eersteId}/?key=3ef36135e7fda4370a11fd6191fef2af`).
            then(function (response: any) {
                res.render('bekijken',{dataBekijken:response.data});
                return response.data;
            })
        console.log("fig");
        console.log(fig);
        figdata = fig;
        
    })
    
})

app.get('/blacklist', (req: any, res: any) => {
    res.render('blacklist');
})

app.get('/ordenen', (req: any, res: any) => {
    res.render('ordenen');
})

app.listen(app.get('port'),
    () => console.log('[server] http://localhost:' + app.get('port')));
    */