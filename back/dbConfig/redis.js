var redis = require("redis");
let redisClient;

var connect = (callBack)=>{
    redisClient = redis.createClient();
    redisClient.on("error", (err)=>{console.log("Rediska Error " + err);});
    redisClient.on("connect",()=>{console.log("Rediska v dele")});
    callBack();
}

function get(){
    return redisClient;
}

module.exports = {
    redisConnect: connect,
    redisClient: get
};