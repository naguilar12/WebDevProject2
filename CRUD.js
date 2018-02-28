const assert = require('assert');
exports.insertWeight = function (db, callback, userId, weight) {
    const dbase = db.db("nutrition"); //here
    // Get the documents collection
    let collection = dbase.collection("weights");
    try {
        collection.find({'userId': userId}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            let weights = [];
            if (docs) {
                weights=docs[0].weights;
            }

            weights.push(weight);
            collection.updateOne({userId: userId}
                , {$set: {weights: weights}}, {upsert: true},
                function (err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    console.log("Added weight");
                    callback(result);
                });
        });
    }
        catch(err){
            dbase.createCollection('weights',{ size: 2148 });
            collection = dbase.collection('weights');
            console.log(collection);
            collection.updateOne({userId: userId}
                , {$set: {weights: [weight]}}, {upsert: true},
                function (err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    console.log("Added weight");
                    callback(result);
                });
        }

};
exports.insertChallenge = function (db, callback, userId, challenge) {
    const dbase = db.db("nutrition"); //here
    // Get the documents collection
    let collection = dbase.collection("challenge");
    try {
        collection.find({'userId': userId}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            let challenges = [];
            try {
                let newChallenge = {};
                newChallenge.kcals = challenge.kcals;
                newChallenge.carbohydrates = challenge.carbohydrates;
                newChallenge.protein = challenge.protein;
                newChallenge.fat = challenge.fiber;
                newChallenge.fiber = challenge.fiber;
            }
            catch(err){
                callback(err);
            }

            if (docs) {
                challenges=docs[0].challenges;
            }

            challenges.push(newChallenge);
            collection.updateOne({userId: userId}
                , {$set: {challenges: challenges}}, {upsert: true},
                function (err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    console.log("Added challenge");
                    callback(result);
                });
        });
    }
    catch(err){
        try {
            let newChallenge = {};
            newChallenge.kcals = challenge.kcals;
            newChallenge.carbohydrates = challenge.carbohydrates;
            newChallenge.protein = challenge.protein;
            newChallenge.fat = challenge.fiber;
            newChallenge.fiber = challenge.fiber;
        }
        catch(err){
            callback(err);
        }
        dbase.createCollection('challenges',{ size: 2148 });
        collection = dbase.collection('challenges');
        console.log(collection);
        collection.updateOne({userId: userId}
            , {$set: {challenges: [challenge]}}, {upsert: true},
            function (err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Added challenge");
                callback(result);
            });
    }

};
exports.insertConsumption = function (db, callback, userId, consumption) {
    const dbase = db.db("nutrition"); //here
    // Get the documents collection
    let collection = dbase.collection("consumption");
    try {
        collection.find({'userId': userId}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            let consumptions = [];
            try {
                let newconsumption = {};
                newconsumption.kcals = consumption.kcals;
                newconsumption.carbohydrates = consumption.carbohydrates;
                newconsumption.protein = consumption.protein;
                newconsumption.fat = consumption.fiber;
                newconsumption.fiber = consumption.fiber;
            }
            catch(err){
                callback(err);
            }

            if (docs) {
                consumptions=docs[0].consumptions;
            }

            consumptions.push(newconsumption);
            collection.updateOne({userId: userId}
                , {$set: {consumptions: consumptions}}, {upsert: true},
                function (err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    console.log("Added consumption");
                    callback(result);
                });
        });
    }
    catch(err){
        try {
            let newconsumption = {};
            newconsumption.kcals = consumption.kcals;
            newconsumption.carbohydrates = consumption.carbohydrates;
            newconsumption.protein = consumption.protein;
            newconsumption.fat = consumption.fiber;
            newconsumption.fiber = consumption.fiber;
        }
        catch(err){
            callback(err);
        }
        dbase.createCollection('consumptions',{ size: 2148 });
        collection = dbase.collection('consumptions');
        console.log(collection);
        collection.updateOne({userId: userId}
            , {$set: {consumptions: [consumption]}}, {upsert: true},
            function (err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Added consumption");
                callback(result);
            });
    }

};
exports.indexCollections = function (db, callback) {
    const dbase = db.db("nutrition"); //here

    dbase.collection('weights').createIndex(
        {"userId": 1},
        null,
        function (err, results) {
            console.log(results);
            callback();
        }
    );
    dbase.collection('challenges').createIndex(
        {"userId": 1},
        null,
        function (err, results) {
            console.log(results);
            callback();
        }
    );
    dbase.collection('consumptions').createIndex(
        {"userId": 1},
        null,
        function (err, results) {
            console.log(results);
            callback();
        }
    );
};

exports.getWeights = function (db, callback, userId) {
    const dbase = db.db("nutrition"); //here

    // Get the documents collection
    let collection = dbase.collection('weights');

    collection.find({'userId': userId}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};
exports.getChallenges = function (db, callback, userId) {
    const dbase = db.db("nutrition"); //here

    // Get the documents collection
    let collection = dbase.collection('challenges');

    collection.find({'userId': userId}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};
exports.getConsumptions = function (db, callback, userId) {
    const dbase = db.db("nutrition"); //here

    // Get the documents collection
    let collection = dbase.collection('consumptions');

    collection.find({'userId': userId}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};
exports.getLastWeight = function (db, callback, userId) {
    const dbase = db.db("nutrition"); //here

    // Get the documents collection
    let collection = dbase.collection('weights');

    collection.find({'userId': userId}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        let weights = docs['weights'];
        let w = weights[weights.length - 1];
        callback(w);
    });
};
exports.getLastChallenge = function (db, callback, userId) {
    const dbase = db.db("nutrition"); //here

    // Get the documents collection
    let collection = dbase.collection('challenges');

    collection.find({'userId': userId}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        let challenges = docs['challenges'];
        let w = challenges[challenges.length - 1];
        callback(w);
    });
};
exports.getLastConsumption = function (db, callback, userId) {
    const dbase = db.db("nutrition"); //here

    // Get the documents collection
    let collection = dbase.collection('consumptions');

    collection.find({'userId': userId}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        let consumptions = docs['consumptions'];
        let w = consumptions[consumptions.length - 1];
        callback(w);
    });
};
