const express = require("express");
const MongoClient  = require("mongodb").MongoClient;
const assert = require('assert');
var request = require('request');

const app = express();

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'nutrition';


app.get("/food/:name", function (req, res){
    //TODO: CALL API HERE
    request("https://api.nal.usda.gov/ndb/search/?format=json&q="+req.params.name+"&max=25&offset=0&api_key=hLowbDVqOU42auJEBrZPL8tGUSbGd5ok91ficFr3",
    function (error, response, body){
        if (error){
            console.log(error);
        }
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(body);
        }
    })
    //res.send(resultFromApi);
});

app.post("/myWeight/:userId/:userHash", function (req, res){
    //TODO: search db if user already has a document of weights add value, else create document
});

app.listen(80, () => {
    console.log("Listening on :80");
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