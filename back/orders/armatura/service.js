const {
  client,
  ObjectID
} = require('../../dbConfig/mongo.js');

const Collection = client().db("RaskroiAccount").collection("Armatura");

var add = (adding, callBack) => {
  Collection.insertOne(adding, function(err, result){
      callBack(err,result.ops);
  });
};

var update  = (id,upd,callBack) => {
  Collection.updateOne({"_id":ObjectID(id)},{$set:upd},function(err,result){
    callBack(err,result.ops);
  });
};

var del = (id,callBack) => {
 Collection.deleteOne({"_id":ObjectID(id)},function(err,result){
   return callBack(err,result.ops);
 })
};

var get = (id,callBack) =>{
  Collection.findOne({"_id":ObjectID(id)}, (err,result)=>{
    return callBack(err,result.ops);
  });
};

var getAll = (callBack) =>{
  Collection.find().toArray(function(err, results){
    return callBack(err,results);
  });
};

var getByCart = (id,callBack) => {
  Collection.find({"guidCart":id}).toArray(function(err, results){
    return callBack(err,results);
  });
}

module.exports = {
  add: add,
  update: update,
  delete: del,
  get: get,
  getAll: getAll,
  getByCart: getByCart
};