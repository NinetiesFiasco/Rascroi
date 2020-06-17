require("dotenv").config();
const mongoClient = require("mongodb").MongoClient; 
const ObjectID = require('mongodb').ObjectID;
let client;

function connect(callback){
    mongoClient.connect(process.env.MONGO_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    },(err, _client) => {
        client = _client;
        console.log('Zamonguem vse che est');
        callback();
    });
}

function get(){
    return client;
}

function close(){
    console.log('MongoDB disconnected');
    client.close();
}

module.exports = {
    connect: connect,
    client: get,
    close: close,
    ObjectID: ObjectID
};