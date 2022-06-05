var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//code afkomstig van het vak Webprogrammeren
var _this = this;
var express = require('express');
var app = express();
var ejs = require('ejs');
var axios = require('axios');
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
var db = 'itproject';
var collection = 'yaba';
var ids = [];
var _a = require('mongodb'), MongoClient = _a.MongoClient, ObjectId = _a.ObjectId;
var uri = "mongodb+srv://yaba:yabaitproject@cluster0.bj6tu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var client = new MongoClient(uri, { useUnifiedTopology: true });
var data = [];
var data2 = [];
var blacklistData = [];
var Main = function () { return __awaiter(_this, void 0, void 0, function () {
    var i, cursor, idList, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, 6, 8]);
                // Connect to the MongoDB cluster
                return [4 /*yield*/, client.connect()];
            case 1:
                // Connect to the MongoDB cluster
                _a.sent();
                data2 = [];
                blacklistData = [];
                return [4 /*yield*/, client.db('itproject').collection('yaba').find({}).toArray()];
            case 2:
                data = _a.sent();
                for (i = 0; i < data.length; i++) {
                    if (data[i].waarden.reden === "") {
                        data2.push(data[i]);
                    }
                    else {
                        blacklistData.push(data[i]);
                    }
                }
                return [4 /*yield*/, client.db(db).collection(collection).find({})];
            case 3:
                cursor = _a.sent();
                return [4 /*yield*/, cursor.toArray()];
            case 4:
                idList = _a.sent();
                idList.forEach(function (el) {
                    ids.push(el.waarden.figId);
                });
                return [3 /*break*/, 8];
            case 5:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.close()];
            case 7:
                _a.sent();
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
Main();
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/informatie', function (req, res) {
    res.render('informatie' /*, { data: db_data }*/);
});
app.get('/ordenen', function (req, res) {
    Main();
    res.render('ordenen', { figIds: ids });
});
app.get('/bekijken', function (req, res) {
    Main();
    res.render('bekijken', {
        data: data2
    });
});
app.get('/blacklist', function (req, res) {
    Main();
    res.render('blacklist', {
        data: blacklistData
    });
});
app.post('/ordenen', function (req, res) {
    var waarden = req.body;
    var insert = function () { return __awaiter(_this, void 0, void 0, function () {
        var result, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 6]);
                    // Connect to the MongoDB cluster
                    return [4 /*yield*/, client.connect()];
                case 1:
                    // Connect to the MongoDB cluster
                    _a.sent();
                    return [4 /*yield*/, client.db(db).collection(collection).insertOne({ waarden: waarden })];
                case 2:
                    result = _a.sent();
                    return [3 /*break*/, 6];
                case 3:
                    e_2 = _a.sent();
                    console.error(e_2);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, client.close()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    insert();
});
app.get('/databaseInsert', function (req, res) {
    var waarden = req.query;
    var insert = function () { return __awaiter(_this, void 0, void 0, function () {
        var result, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 6]);
                    // Connect to the MongoDB cluster
                    return [4 /*yield*/, client.connect()];
                case 1:
                    // Connect to the MongoDB cluster
                    _a.sent();
                    return [4 /*yield*/, client.db(db).collection(collection).insertOne({ waarden: waarden })];
                case 2:
                    result = _a.sent();
                    Main();
                    return [3 /*break*/, 6];
                case 3:
                    e_3 = _a.sent();
                    console.error(e_3);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, client.close()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    insert();
});
app.get('/databaseChange', function (req, res) {
    var waarden = req.query;
    var nieuweReden = waarden.reden;
    var id = waarden.figId;
    if (nieuweReden != "") {
        var change = function () { return __awaiter(_this, void 0, void 0, function () {
            var data, objectId, fig, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, client.db(db).collection(collection).find({}).toArray()];
                    case 2:
                        data = _a.sent();
                        objectId = "";
                        data.forEach(function (fig) {
                            if (fig.waarden.figId == id) {
                                objectId = fig._id;
                            }
                        });
                        if (!(objectId != "")) return [3 /*break*/, 6];
                        return [4 /*yield*/, client.db(db).collection(collection).findOne({ _id: objectId })];
                    case 3:
                        fig = _a.sent();
                        fig.waarden.reden = nieuweReden;
                        return [4 /*yield*/, client.db(db).collection(collection).updateOne({ _id: objectId }, { $set: { waarden: fig.waarden } })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, client.db(db).collection(collection).find({}).toArray()];
                    case 5:
                        data = _a.sent();
                        blacklistData = [];
                        for (i = 0; i < data.length; i++) {
                            if (data[i].waarden.reden === "") {
                            }
                            else {
                                blacklistData.push(data[i]);
                            }
                        }
                        res.render('blacklist', {
                            data: blacklistData
                        });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        change();
    }
});
app.get('/databaseDelete', function (req, res) {
    var waarden = req.query;
    var id = waarden.figId;
    var insert = function () { return __awaiter(_this, void 0, void 0, function () {
        var figId_1, data_1, i, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, 7, 9]);
                    // Connect to the MongoDB cluster
                    return [4 /*yield*/, client.connect()];
                case 1:
                    // Connect to the MongoDB cluster
                    _a.sent();
                    figId_1 = "";
                    return [4 /*yield*/, client.db(db).collection(collection).find({}).toArray()];
                case 2:
                    data_1 = _a.sent();
                    data_1.forEach(function (fig) {
                        if (fig.waarden.figId == id) {
                            figId_1 = fig._id;
                        }
                    });
                    if (!(figId_1 != "")) return [3 /*break*/, 5];
                    return [4 /*yield*/, client.db(db).collection(collection).deleteOne({ _id: figId_1 })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, client.db(db).collection(collection).find({}).toArray()];
                case 4:
                    data_1 = _a.sent();
                    blacklistData = [];
                    data2 = [];
                    for (i = 0; i < data_1.length; i++) {
                        if (data_1[i].waarden.reden === "") {
                            data2.push(data_1[i]);
                        }
                        else {
                            blacklistData.push(data_1[i]);
                        }
                    }
                    _a.label = 5;
                case 5: return [3 /*break*/, 9];
                case 6:
                    e_4 = _a.sent();
                    console.error(e_4);
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, client.close()];
                case 8:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    insert();
});
app.get('/parts', function (req, res) {
    var index = req.query;
    var apiCall = function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get("https://rebrickable.com/api/v3/lego/minifigs/".concat(index.id, "/parts/?key=3ef36135e7fda4370a11fd6191fef2af"))];
                case 1:
                    response = _a.sent();
                    res.render('parts', { data: response.data.results });
                    return [2 /*return*/];
            }
        });
    }); };
    apiCall();
});
app.get('/figs', function (req, res) {
    var index = req.query;
    var apiCall = function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get("https://rebrickable.com/api/v3/lego/sets/".concat(index.id, "/minifigs/?key=3ef36135e7fda4370a11fd6191fef2af"))];
                case 1:
                    response = _a.sent();
                    res.render('figs', { data: response.data.results });
                    return [2 /*return*/];
            }
        });
    }); };
    apiCall();
});
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function () { });
