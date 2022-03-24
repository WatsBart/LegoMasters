var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'sql11.freesqldatabase.com',
    user: 'sql11481004',
    password: 'PSkdDGHXuh',
    database: 'sql11481004'
});

db.connect((err) => {
    if(err) throw err;
    console.log('Database is connected successfully');
});

db.query("select * from `EersteTabel`", (err,results) => {
    if(err) console.log("can't connect");
    console.log(results);
})