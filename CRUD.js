const assert = require('assert');
exports.insertWeight = function (db, callback, userId, weight) {
    if (!weight){
        callback(null);
        return;
    }
    const dbase = db.db("nutrition"); //here
    // Get the documents collection
    let collection = dbase.collection("weights");
    try {
        collection.find({'userId': userId}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            let weights = [];
            let dates = [];
            let date = new Date();
            date=date/(3600*1000);
            if (docs && docs.length>0) {
                weights = docs[0].weights;
                dates=docs[0].dates;
                if (date-dates[dates.length-1]<20){//if actual date is not at least 20 hours later
                    weights.pop();
                    weights.push(weight);
                    dates.pop();
                    dates.push(date);
                }
                else{
                    weights.push(weight);
                    dates.push(date);
                }
            }else{
                weights.push(weight);
                dates.push(date);
            }
            collection.updateOne({userId: userId}
                , {$set: {weights: weights, dates: dates}}, {upsert: true},
                function (err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    console.log("Added weight");
                    callback(result);
                });
        });
    }
    catch (err) {
        dbase.createCollection('weights', {size: 2148});
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
    let collection = dbase.collection("challenges");
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
                if (docs &&docs.length>0) {
                    challenges = docs[0].challenges;
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
            }
            catch (err) {
                callback(err);
            }


        });
    }
    catch (err) {
        try {
            let newChallenge = {};
            newChallenge.kcals = challenge.kcals;
            newChallenge.carbohydrates = challenge.carbohydrates;
            newChallenge.protein = challenge.protein;
            newChallenge.fat = challenge.fiber;
            newChallenge.fiber = challenge.fiber;
            dbase.createCollection('challenges', {size: 2148});
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
        catch (err) {
            callback(err);

        }

    }

};
exports.insertConsumption = function (db, callback, userId, consumption) {
    const dbase = db.db("nutrition"); //here
    // Get the documents collection
    let collection = dbase.collection("consumptions");
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
                if (docs  &&docs.length>0) {
                    consumptions = docs[0].consumptions;
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
            }
            catch (err) {
                callback(err);
                return;
            }


        });
    }
    catch (err) {
        try {
            let newconsumption = {};
            newconsumption.kcals = consumption.kcals;
            newconsumption.carbohydrates = consumption.carbohydrates;
            newconsumption.protein = consumption.protein;
            newconsumption.fat = consumption.fiber;
            newconsumption.fiber = consumption.fiber;
            dbase.createCollection('consumptions', {size: 2148});
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
        catch (err) {
            callback(err);
        }

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
        if (docs && docs.length>0) {
            let weights = docs[0].weights;
            if (weights && weights.length > 0) {
                let w = weights[weights.length - 1];
                callback(w);
            } else {
                callback(null);
            }
        }else{
            callback(null);
        }
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
        if (docs && docs.length>0) {
            let challenges = docs[0].challenges;
            console.log(challenges);
            if (challenges && challenges.length > 0) {
                let w = challenges[challenges.length - 1];
                console.log("w: " + w);
                callback(w);
            } else {
                callback(null);
            }
        }else{
            callback(null);
        }

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
        if (docs && docs.length>0) {
            let consumptions = docs[0].consumptions;
            if (consumptions && consumptions.length > 0) {
                let w = consumptions[consumptions.length - 1];
                callback(w);
            } else {
                callback(null);
            }
        }else{
            callback(null);
        }
    });
};
exports.dropCollections = function (db, callback, userId) {
    const dbase = db.db("nutrition"); //here

    // Get the documents collection
    let collection = dbase.collection('consumptions');
    collection.drop();
    collection= dbase.collection('weights');
    collection.drop();
    collection= dbase.collection('chsllenges');
    collection.drop();
    callback();
};