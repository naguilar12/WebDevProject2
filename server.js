const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
const request = require('request');
const CRUD = require("./CRUD");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');


// Connection URL
const DBurl = 'mongodb://nutrition:2QH3TtBYA3Y5pBIA@cluster0-shard-00-00-oxsv4.mongodb.net:27017,cluster0-shard-00-01-oxsv4.mongodb.net:27017,cluster0-shard-00-02-oxsv4.mongodb.net:27017/nutrition?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

// Database Name
const dbName = 'nutrition';

//Uses static directory "public"
//app.use(express.static("public"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend/build")));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/*
app.get("/", (req, res) =>{
    console.log("hola");
    console.log("Cookies :  ", req.cookies);
    if(req.cookies){
        res.cookie(cookie_name , 'cookie_value').send('Cookie is set');
    }else{
        res.sendfile("public", "index.html")
    }
});
*/
app.get("/index.html", (req, res) =>{
    console.log("Cookies :  ", req.cookies);
    if(req.cookies){

    }else{
        res.sendfile("public", "index.html");
    }
});

app.get("/challenge.html", (req, res) =>{
    console.log("Cookies :  ", req.cookies);
    if(req.cookies){
        res.sendfile("public", "challenge.html");
    }else{
        res.sendfile("public", "index.html");
    }
});

app.get("/stats.html", (req, res) => {
    console.log("Cookies :  ", req.cookies);
    if(req.cookies){
        res.sendfile("public", "stats.html");
    }else{
        res.sendfile("public", "index.html");
    }
});

app.get("/API/food/:name", function (req, res) {
    // CALL API HERE
    request("https://api.nal.usda.gov/ndb/search/?format=json&q=" + req.params.name + "&max=25&offset=0&api_key=hLowbDVqOU42auJEBrZPL8tGUSbGd5ok91ficFr3",
        function (error, response, body) {
            if (error) {
                console.log(error);
            }
            if (!error && response.statusCode == 200) {
                if(JSON.parse(body).list) {
                    res.send(JSON.parse(body).list.item);
                }
                else{
                    res.send([]);
                }
            }
        })
});
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
                item=null;
                let kcals,protein,fat,carbohydrates,fiber;
                if(food){
                    food.nutrients.forEach((n)=>{
                       if (n.name==="Energy") {
                           kcals = n.value;
                       }
                       else if(n.name==="Protein"){
                           protein = n.value;
                       }
                       else if(n.name === "Total lipid (fat)"){
                           fat= n.value;
                       }
                       else if(n.name === "Carbohydrate, by difference"){
                           carbohydrates = n.value;
                       }
                       else if ( n.name === "Fiber, total dietary"){
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

app.get("/API/myChallenge/:userId", function (req, res) {
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

app.get("/API/myConsumption/:userId", function (req, res) {
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

app.post("/API/myConsumption/:userId", function (req, res) {
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



app.listen(process.env.PORT || 80, () => {
    console.log("Listening on :80");
});



