//code afkomstig van het vak Webprogrammeren

const express = require('express');
const app = express();
const ejs = require('ejs');
const axios = require('axios');

app.set('view engine', 'ejs');
app.set('port', 3000);
app.use(express.static('views'));


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


app.listen(app.get('port'),
    () => console.log('[server] http://localhost:' + app.get('port')));


