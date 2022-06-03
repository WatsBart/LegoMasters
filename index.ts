//code afkomstig van het vak Webprogrammeren

const express = require('express');
const app = express();
const ejs = require('ejs');
const axios = require('axios');

app.set('view engine', 'ejs');
app.set('port', 3000);
app.use(express.static('views'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }))

const db = 'itproject';
const collection = 'yaba';
let ids: string[] = [];

const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://yaba:yabaitproject@cluster0.bj6tu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useUnifiedTopology: true });
interface Lego {
    waarden: {
        figId: string,
        figUrl: string,
        setId: string,
        setUrl: string,
        reden?: string
    }

}

let data: Lego[] = [];
let data2: any = [];
let blacklistData: any = [];
let Main = async () => {
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        data = await client.db('itproject').collection('yaba').find({}).toArray();
        //console.log(data);
        for (let i = 0; i < data.length; i++) {
            if (data[i].waarden.reden === "") {
                data2.push(data[i]);
            }
            else {
                blacklistData.push(data[i]);
            }
        }

        let cursor = await client.db(db).collection(collection).find({});
        let idList = await cursor.toArray();
        idList.forEach((el: any) => {
            ids.push(el.waarden.figId);
        });
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
    Main();
    res.render('ordenen', { figIds: ids });
})

app.get('/bekijken', (req: any, res: any) => {
    Main();
    res.render('bekijken', {
        data: data2
    });
})

app.get('/blacklist', (req: any, res: any) => {
    Main();
    res.render('blacklist', {
        data: blacklistData
    });
})

app.post('/ordenen', (req: any, res: any) => {
    let waarden = req.body;
    let insert = async () => {
        try {
            // Connect to the MongoDB cluster
            await client.connect();
            const result = await client.db(db).collection(collection).insertOne({ waarden });
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
    insert();
})

app.get('/databaseInsert', (req: any, res: any) => {
    let waarden = req.query;
    let insert = async () => {
        try {
            // Connect to the MongoDB cluster
            await client.connect();
            const result = await client.db(db).collection(collection).insertOne({ waarden });
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
    insert();
})

app.get('/databaseChange', (req: any, res: any) => {
    let waarden = req.query;
    console.log(waarden);
    console.log("databaseChange");
})

app.get('/databaseDelete', (req: any, res: any) => {
    let waarden = req.query;
    console.log(waarden);
    console.log("databaseDelete");
    let id = waarden.figId;
    let insert = async () => {
        try {
            // Connect to the MongoDB cluster
            await client.connect();
            let figId = "";
            let data = await client.db(db).collection(collection).find({}).toArray();
            data.forEach((fig: any) => {
                if (fig.waarden.figId == id) {
                    figId = fig._id;
                }
            });
            if (figId != "") {
                await client.db(db).collection(collection).deleteOne({ _id: figId });
                data = await client.db(db).collection(collection).find({}).toArray();
                blacklistData = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].waarden.reden === "") {

                    }
                    else {
                        blacklistData.push(data[i]);
                    }
                }
                res.render('blacklist', {
                    data: blacklistData
                });
            }
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

