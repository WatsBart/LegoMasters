//code afkomstig van het vak Webprogrammeren

const express = require('express');
const app = express();
const ejs = require('ejs');
const axios = require('axios');

app.set('view engine', 'ejs');
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
        data2 = [];
        blacklistData = [];
        data = await client.db('itproject').collection('yaba').find({}).toArray();
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
            Main();
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
    let nieuweReden = waarden.reden;
    let id = waarden.figId;
    if(nieuweReden != ""){
        let change = async () => {
            await client.connect();
            let data = await client.db(db).collection(collection).find({}).toArray();
            let objectId = "";
            data.forEach((fig: any) => {
                if (fig.waarden.figId == id) {
                    objectId = fig._id;
                }
            });
            if(objectId != ""){
                let fig = await client.db(db).collection(collection).findOne({_id:objectId});
                fig.waarden.reden = nieuweReden;
                await client.db(db).collection(collection).updateOne({_id:objectId},{$set:{waarden:fig.waarden}});
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
        }
        change();
    }
})

app.get('/databaseDelete', (req: any, res: any) => {
    let waarden = req.query;
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
                data2 =[];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].waarden.reden === "") {
                        data2.push(data[i]);
                    }
                    else {
                        blacklistData.push(data[i]);
                    }
                }
            }

        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
    insert();
})

app.get('/parts', (req: any, res: any) => {
    let index = req.query;
    const apiCall = async () => {
    let response = await axios.get(`https://rebrickable.com/api/v3/lego/minifigs/${index.id}/parts/?key=3ef36135e7fda4370a11fd6191fef2af`);
    res.render('parts', {data: response.data.results});
    }
    apiCall();
})

app.get('/figs', (req: any, res: any) => {
    let index = req.query;
    const apiCall = async () => {
    let response = await axios.get(`https://rebrickable.com/api/v3/lego/sets/${index.id}/minifigs/?key=3ef36135e7fda4370a11fd6191fef2af`);
    res.render('figs', {data: response.data.results});
    }
    apiCall();
})

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() { });