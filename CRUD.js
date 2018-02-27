let insertWeight = function (db, callback, userId, weight) {
    // Get the documents collection
    let collection = db.collection('weights');

    collection.find({'userId': userId}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        let weights=[];
        if (docs){
            weights.append(docs['weights']);
        }
        weights.append(weight);
        collection.updateOne({userId: userId}
            , {$set: {weights: weights}}, {upsert: true},
            function (err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Added weight");
                callback(result);
            });

    });
};
let insertChallenge = function (db, callback, userId, challenge) {
    // Get the documents collection
    let collection = db.collection('challenges');
    // Insert some documents
    collection.find({'userId': userId}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        let challenges=[];
        if (docs){
            weights.append(docs['challenges']);
        }
        weights.append(challenge);
        collection.updateOne({userId: userId}
            , {$set: {challenges: challenges}}, {upsert: true},
            function (err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Added challenge");
                callback(result);
            });

    });
};
let insertConsumption = function (db, callback, userId, consumption) {
    // Get the documents collection
    let collection = db.collection('consumptions');
    // Insert some documents
    collection.find({'userId': userId}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        let consumptions=[];
        if (docs){
            weights.append(docs['consumptions']);
        }
        weights.append(consumption);
        collection.updateOne({userId: userId}
            , {$set: {consumptions: consumption}}, {upsert: true},
            function (err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Added consumption");
                callback(result);
            });

    });
};

let indexCollections = function (db, callback) {
    db.collection('weights').createIndex(
        {"userId": 1},
        null,
        function (err, results) {
            console.log(results);
            callback();
        }
    );
    db.collection('challenges').createIndex(
        {"userId": 1},
        null,
        function (err, results) {
            console.log(results);
            callback();
        }
    );
    db.collection('consumptions').createIndex(
        {"userId": 1},
        null,
        function (err, results) {
            console.log(results);
            callback();
        }
    );
};

let getWights = function (db, callback, userId) {
    // Get the documents collection
    let collection = db.collection('weights');

    collection.find({'userId': userId}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};
let getChallenges = function (db, callback, userId) {
    // Get the documents collection
    let collection = db.collection('challenges');

    collection.find({'userId': userId}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};
let getConsumptions = function (db, callback, userId) {
    // Get the documents collection
    let collection = db.collection('consumptions');

    collection.find({'userId': userId}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};
let getLastWeight = function (db, callback, userId) {
    // Get the documents collection
    let collection = db.collection('weights');

    collection.find({'userId': userId}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        let weights=docs['weights'];
        let w = weights[weights.length-1];
        callback(w);
    });
};
let getLastChallenge = function (db, callback, userId) {
    // Get the documents collection
    let collection = db.collection('challenges');

    collection.find({'userId': userId}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        let challenges=docs['challenges'];
        let w = challenges[challenges.length-1];
        callback(w);
    });
};
let getLastConsumption = function (db, callback, userId) {
    // Get the documents collection
    let collection = db.collection('consumptions');

    collection.find({'userId': userId}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        let consumptions=docs['consumptions'];
        let w = consumptions[consumptions.length-1];
        callback(w);
    });
};