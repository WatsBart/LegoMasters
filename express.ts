//code afkomstig van het vak Webprogrammeren

const express = require('express');
const app = express();
const ejs = require('ejs');
const axios = require('axios');

app.set('view engine', 'ejs');
app.set('port', 3000);
app.use(express.static('views'));

const db = 'itproject';
const collection = 'yaba';

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://yaba:yabaitproject@cluster0.bj6tu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useUnifiedTopology: true });
let Main = async () => {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        //...
        //const result = await client.db(db).collection(collection).deleteMany({});
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
Main();

app.get('/', (req: any, res: any) => {
    res.render('index');
})

app.get('/informatie', (req: any, res: any) => {
    res.render('informatie'/*, { data: db_data }*/);
})

app.get('/ordenen', (req: any, res: any) => {
    res.render('ordenen');
})

app.get('/bekijken', (req: any, res: any) => {
    res.render('bekijken');
})

app.get('/blacklist', (req: any, res: any) => {
    res.render('blacklist');
})

app.get('/databaseInsert', (req: any, res: any) => {
    console.log(req.query);
    console.log("get request aanvaard");
    let waarden = req.query;
    let insert = async () => {
        try {
            // Connect to the MongoDB cluster
            await client.connect();
            const result = await client.db(db).collection(collection).insertOne({waarden});
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
    insert();
})

app.listen(app.get('port'),
    () => console.log('[server] http://localhost:' + app.get('port')));

