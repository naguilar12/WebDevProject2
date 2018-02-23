const express = require("express");
const MongoClient  = require("mongodb").MongoClient;
const assert = require('assert');
const app = express();

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'nutrition';

//Uses static directory "public"
app.use(express.static("public"));

app.get("/food/:name", function (req, res){
    var name=req.params.name;
    //TODO: CALL API HERE
    //res.send(resultFromApi);
});

app.post("/myWeight/:userId/:userHash", function (req, res){
    //TODO: search db if user already has a document of weights add value, else create document
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));


// Use connect method to connect to the Server
/*
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
});*/