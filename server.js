const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const mysql = require("mysql");
const assert = require("assert");
const request = require("request");
const CRUD = require("./CRUD");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const utf8 = require("utf8");
const base64 = require("base-64");


// Connection URL
const DBurl = process.env.MONGODB_URI;

//Uses static directory "public"
//app.use(express.static("public"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "frontend/build")));

//Es recomendable que separen las peticiones que satisface su API del archivo server.js
//Pueden hacer uso del Router de express y separar por carpetas dependiendo de las funcionalidades

//En cuanto a las peticiones que acceden al req.body.params, seria bueno indicar que propiedades se solicitan
//para cada petición en específico. De resto, el proyecto esta muy bien documentado

//search for a food obj
app.get("/API/food/:name", function (req, res) {
    // CALL API HERE
    request("https://api.nal.usda.gov/ndb/search/?format=json&q=" + req.params.name + "&max=25&offset=0&api_key=hLowbDVqOU42auJEBrZPL8tGUSbGd5ok91ficFr3",
        function (error, response, body) {
            if (error) {
                console.log(error);
            }
            if (!error && response.statusCode == 200) {
                if (JSON.parse(body).list) {
                    res.send(JSON.parse(body).list.item);
                }
                else {
                    res.send([]);
                }
            }
        })
});

//get detail of a food obj
app.get("/API/food/nutrition/:id", function (req, res) {
    // CALL API HERE
    let url = "https://api.nal.usda.gov/ndb/V2/reports?ndbno=" + req.params.id + "&type=f&format=json&api_key=hLowbDVqOU42auJEBrZPL8tGUSbGd5ok91ficFr3";
    console.log(url);
    request(url,
        function (error, response, body) {
            if (error) {
                console.log(error);
            }
            if (!error && response.statusCode == 200) {
                let food = JSON.parse(body).foods[0].food;
                let item = null;
                let kcals, protein, fat, carbohydrates, fiber;
                if (food) {
                    food.nutrients.forEach((n) => {
                        if (n.name === "Energy") {
                            kcals = n.value;
                        }
                        else if (n.name === "Protein") {
                            protein = n.value;
                        }
                        else if (n.name === "Total lipid (fat)") {
                            fat = n.value;
                        }
                        else if (n.name === "Carbohydrate, by difference") {
                            carbohydrates = n.value;
                        }
                        else if (n.name === "Fiber, total dietary") {
                            fiber = n.value;
                        }
                    });
                    item = {
                        name: food.desc.name,
                        kcals: kcals,
                        protein: protein,
                        fat: fat,
                        carbohydrates: carbohydrates,
                        fiber: fiber
                    };
                }
                res.send(item);

            }
        })

});

//post a new weight  for a user
app.post("/API/myWeight/:userId/:value", function (req, res) {
    //TODO: search db if user already has a document of weights add value, else create document
    MongoClient.connect(DBurl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        CRUD.insertWeight(db, function (weights) {
            db.close();
            res.send(weights);
        }, Number(req.params.userId), Number(req.params.value));
    });
});

//get all weights for a user
app.get("/API/myWeight/:userId", function (req, res) {
    // search db if user already has a document of weights add value

    MongoClient.connect(DBurl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        CRUD.getWeights(db, function (weights) {
            db.close();
            res.send(weights);
        }, Number(req.params.userId));
    });
});

//get last weight for a user
app.get("/API/myWeight/last/:userId", function (req, res) {
    // search db if user already has a document of weights add value

    MongoClient.connect(DBurl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        CRUD.getLastWeight(db, function (w) {
            db.close();
            res.send(w);
        }, Number(req.params.userId));
    });
});

//get weight variation in last 2 weeks
app.get("/API/myWeight/difference/:userId", function (req, res) {
    // search db if user already has a document of weights add value

    MongoClient.connect(DBurl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        CRUD.weightDifference(db, function (w) {
            db.close();
            res.send(w);
        }, Number(req.params.userId));
    });
});

//get last challenge for a user
app.get("/API/myChallenge/last/:userId", function (req, res) {
    // search db if user already has a document of challenge returns last value

    MongoClient.connect(DBurl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        CRUD.getLastChallenge(db, function (weights) {
            db.close();
            res.send(weights);
        }, Number(req.params.userId));
    });
});

//set a new challenge for a user
app.post("/API/myChallenge/:userId", function (req, res) {
    // search db if user already has a document of challenge add value

    console.log(req.body.kcals);
    MongoClient.connect(DBurl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        CRUD.insertChallenge(db, function (weights) {
            db.close();
            res.send(weights);
        }, Number(req.params.userId), req.body);
    });
});

//get last consumption for a user
app.get("/API/myConsumption/last/:userId", function (req, res) {
    // search db if user already has a document of consumption returns last value

    MongoClient.connect(DBurl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        CRUD.getLastConsumption(db, function (weights) {
            db.close();
            res.send(weights);
        }, Number(req.params.userId));
    });
});

//get all consumptions for a user
app.post("/API/myConsumption/:userId", function (req, res) {
    // search db if user already has a document of consumption add value

    MongoClient.connect(DBurl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        CRUD.insertConsumption(db, function (weights) {
            db.close();
            res.send(weights);
        }, Number(req.params.userId), req.body);
    });
});

//update last value of consumption
app.put("/API/myConsumption/:userId", function (req, res) {
    // search db if user already has a document of consumption update last value
    MongoClient.connect(DBurl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        CRUD.updateConsumption(db, function (weights) {
            db.close();
            res.send(weights);
        }, Number(req.params.userId), req.body);
    });
});

app.get("/API/login/:userData", (req, res) => {
    let encoded = req.params.userData;
    let decoded = base64.decode(encoded);
    let params = utf8.decode(decoded).split(";;;");

    let connection = mysql.createConnection(process.env.JAWSDB_URL);
    connection.connect();
    connection.query("SELECT * FROM USERS WHERE EMAIL=\"" + params[0] + "\";", (err, rows, fields) => {
        if (err) {
            console.log(err);
            return;
        }
        let user = null;
        if (rows[0].PASSWORD === params[1]) {
            user = {
                id: rows[0].ID,
                name: rows[0].NAME,
                email: params[0]
            };
            console.log("login success");
        }
        res.send(user);
    });
    connection.end();
});

app.get("/API/signin/:userData", (req, res) => {
    let encoded = req.params.userData;
    let decoded = base64.decode(encoded);
    let params = utf8.decode(decoded).split(";;;");

    let connection = mysql.createConnection(process.env.JAWSDB_URL);
    connection.connect();
    try {
        connection.query("INSERT INTO USERS (NAME, EMAIL, PASSWORD) " +
            "VALUES (\"" + params[0] + "\",\"" + params[1] + "\",\"" + params[2] + "\");", (err, rows, fields) => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
        connection.query("SELECT ID, NAME FROM USERS WHERE EMAIL=\"" + params[1] + "\";", (err, rows, fields) => {
            if (err) {
                console.log(err);
                return;
            }

            let user = {
                id: rows[0].ID,
                name: rows[0].NAME,
                email: params[1]
            };

            res.send(user);
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    } finally {
        connection.end();
    }

});

app.listen(process.env.PORT || 80, () => {
    console.log("Listening on :80");
});


//only activate this to drop all tables.
/*
MongoClient.connect(DBurl, function (err, db) {
    assert.equal(null, err);
    CRUD.dropCollections(db, function(){
        console.log("All collections droped");
    })
});

*/
