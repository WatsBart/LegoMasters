//code afkomstig van het vak Webprogrammeren

const express = require('express');
const app = express();
const ejs = require('ejs');
const axios = require('axios');
const mysql = require('mysql');
app.set('view engine', 'ejs');
app.set('port', 3000);
app.use(express.static('views'));

var db_data: any;

var db = mysql.createConnection({
    host: 'sql11.freesqldatabase.com',
    user: 'sql11481004',
    password: 'PSkdDGHXuh',
    database: 'sql11481004'
});

db.connect((err:any) => {
    if(err) throw err;
    console.log('Database is connected successfully');
});

db.query("select * from `EersteTabel`", (err:any,results:any) => {
    if(err) console.log("can't connect");
    db_data = results;
})

app.get('/',(req:any,res:any)=>{
    res.render('index')
});

app.get('/informatie.html',(req:any,res:any)=>{
    res.render('informatie',{data:db_data});
})

app.get('/contact.html',(req:any,res:any)=>{
    res.render('contact');
})

app.listen(app.get('port'), 
    ()=>console.log( '[server] http://localhost:' + app.get('port')));