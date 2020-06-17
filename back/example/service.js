const {
  client,
  ObjectID
} = require(rootFolder+'/dbConfig/mongo.js');

const Collection = client().db("Orders").collection("Example");

var create = (adding, callBack) => {
  if (adding._id=="")
    delete adding._id;
  Collection.insertOne(adding, function(err, result){
      callBack(err,result);
  });
};

var read = (callBack) =>{
  Collection.find().toArray(function(err, results){
    return callBack(err,results);
  });
};

var update  = (id,upd,callBack) => {
  delete upd._id;
  Collection.updateOne({"_id":ObjectID(id)},{$set:upd},function(err,result){
    callBack(err,result.ops);
  });
};

var _delete = (id,callBack) => {
  Collection.deleteOne({"_id":ObjectID(id)},function(err,result){
    return callBack(err,result.ops);
  })
};

module.exports = {
  create: create,
  read: read,
  update: update,
  delete: _delete
};
