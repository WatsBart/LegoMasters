//code afkomstig van het vak Webprogrammeren

const express = require('express');
const app = express();
const ejs = require('ejs');
const axios = require('axios');

app.set('view engine', 'ejs');
app.set('port', 3000);
app.use(express.static('views'));
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({extended:true}));


const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://yaba:yabaitproject@cluster0.bj6tu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useUnifiedTopology: true });
let Main = async () => {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        //...
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
Main();


app.get('/index.html', (req: any, res: any) => {
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

<<<<<<< HEAD
app.get('/blacklist', (req: any, res: any) => {
    res.render('blacklist');
})

app.get('/ordenen', (req: any, res: any) => {
    res.render('ordenen');
})

app.post('/ordenen', (req:any, res:any) => {
    console.log("post success");
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
})

app.get('/databaseInsert', (req: any, res: any) => {
    console.log(req.query);
    console.log("get request aanvaard");
    let waarden = req.query;
    db.query(`insert into Bekijken (user_id, fig_id, set_id) values(1, "${req.query.figId}", "${req.query.setId}");`, (err: any, results: any) => {
        if (err) console.log(err);    
    })
})
=======
>>>>>>> a44e75c006f75e6bf3c4912c5b78bb447360dd0a

app.listen(app.get('port'),
    () => console.log('[server] http://localhost:' + app.get('port')));


