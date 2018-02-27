const express = require("express");
const MongoClient  = require("mongodb").MongoClient;
const test = require('assert');
const request = require('request');
const insert = require("CRUD.js");

const app = express();

// Connection URL
const DBurl = 'mongodb://nutrition:2QH3TtBYA3Y5pBIA@cluster0-shard-00-00-oxsv4.mongodb.net:27017,cluster0-shard-00-01-oxsv4.mongodb.net:27017,cluster0-shard-00-02-oxsv4.mongodb.net:27017/nutrition?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

// Database Name
const dbName = 'nutrition';

//Uses static directory "public"
app.use(express.static("public"));

app.get("/",(req,res) => res.sendfile("public","index.html"));

app.get("/API/food/:name", function (req, res){
    // CALL API HERE
    request("https://api.nal.usda.gov/ndb/search/?format=json&q="+req.params.name+"&max=25&offset=0&api_key=hLowbDVqOU42auJEBrZPL8tGUSbGd5ok91ficFr3",
    function (error, response, body){
        if (error){
            console.log(error);
        }
        if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body).list.item);
        }
    })
});
app.get("/API/food/nutrition/:id", function (req, res){
    // CALL API HERE
    let url="https://api.nal.usda.gov/ndb/V2/reports?ndbno="+req.params.id+"&type=f&format=json&api_key=hLowbDVqOU42auJEBrZPL8tGUSbGd5ok91ficFr3";
    request(url,
        function (error, response, body){
            if (error){
                console.log(error);
            }
            if (!error && response.statusCode == 200) {
                let food=JSON.parse(body).foods[0].food;

                item={
                    name:food.desc.name,
                    kcals: food.nutrients[1].value,
                    protein: food.nutrients[3].value,
                    fat: food.nutrients[4].value,
                    carbohydrates: food.nutrients[6].value,
                    fiber : food.nutrients[7].value
                };
                res.send(item);
            }
        })

});

app.post("/API/myWeight/:userId/:value", function (req, res){
    //TODO: search db if user already has a document of weights add value, else create document
});

app.get("/API/myWeight/:userId", function (req, res){
    //TODO: search db if user already has a document of weights add value
});

app.get("/API/myChallenge/:userId", function (req, res){
    //TODO: search db if user already has a document of challenge add value
});
app.post("/API/myChallenge/:userId", function (req, res){
    //TODO: search db if user already has a document of challenge add value
});
app.get("/API/myConsumption/:userId", function (req, res){
    //TODO: search db if user already has a document of consumption add value
});
app.post("/API/myConsumption/:userId", function (req, res){
    //TODO: search db if user already has a document of consumption add value
});


app.listen(process.env.PORT || 80, () => {
    console.log("Listening on :80");
});


MongoClient.connect(DBurl, function(err, db) {
    test.equal(null, err);
    console.log("success");
});
/*/ Use connect method to connect to the Server

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    // Insert a single document
    db.collection('inserts').insertOne({a:1}, function(err, r) {
        assert.equal(null, err);
        assert.equal(1, r.insertedCount);

        // Insert multiple documents
        db.collection('inserts').insertMany([{a:2}, {a:3}], function(err, r) {
            assert.equal(null, err);
            assert.equal(2, r.insertedCount);

            client.close();
        });
    });

});

*/
