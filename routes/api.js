let express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
let router = express.Router();


app.get("/food/:name", function (req, res) {
    // CALL API HERE
    request("https://api.nal.usda.gov/ndb/search/?format=json&q=" + req.params.name + "&max=25&offset=0&api_key=hLowbDVqOU42auJEBrZPL8tGUSbGd5ok91ficFr3",
        function (error, response, body) {
            if (error) {
                console.log(error);
            }
            if (!error && response.statusCode == 200) {
                res.send(JSON.parse(body).list.item);
            }
        })
});
app.get("/food/nutrition/:id", function (req, res) {
    // CALL API HERE
    let url = "https://api.nal.usda.gov/ndb/V2/reports?ndbno=" + req.params.id + "&type=f&format=json&api_key=hLowbDVqOU42auJEBrZPL8tGUSbGd5ok91ficFr3";
    request(url,
        function (error, response, body) {
            if (error) {
                console.log(error);
            }
            if (!error && response.statusCode == 200) {
                let food = JSON.parse(body).foods[0].food;

                item = {
                    name: food.desc.name,
                    kcals: food.nutrients[1].value,
                    protein: food.nutrients[3].value,
                    fat: food.nutrients[4].value,
                    carbohydrates: food.nutrients[6].value,
                    fiber: food.nutrients[7].value
                };
                res.send(item);
            }
        })

});

app.post("/myWeight/:userId/:value", function (req, res) {
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

app.get("/myWeight/:userId", function (req, res) {
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

app.get("/myChallenge/:userId", function (req, res) {
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
app.post("/myChallenge/:userId", function (req, res) {
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

app.get("/myConsumption/:userId", function (req, res) {
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

app.post("/myConsumption/:userId", function (req, res) {
    // search db if user already has a document of consumption add value
    if (Number(req.params.userId) !== req.params.userId) {
        res.send(Response.error());
        console.log("wrong formulated API petition");
        return;
    }

    MongoClient.connect(DBurl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        CRUD.insertChallenge(db, function (weights) {
            db.close();
            res.send(weights);
        }, Number(req.params.userId), req.body);
    });
});

