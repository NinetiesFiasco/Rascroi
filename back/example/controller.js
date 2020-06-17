const service = require("./service");

const defaultAnswer = function(err,data,message){
  if (err) return err;
  return{
    success: 1,
    message: message?message:"Success",
    data: data
  }
}

const resObj = function(state,message,data){
  return {
    success: state,
    message: message,
    data: data
  }
}

var create = (req,res) => {
  var adding = req.body;
  adding.dateadd = Date.now();

  service.create(adding, (err,result)=>{
    return res.json(defaultAnswer(err,result));
  });
};


var read = (req,res)=>{
  service.read((err,results)=>{
    let resJson;
    if (err)
      resJson = resObj(2,"SQL Trouble",err);
    else if (!results)
      resJson = resObj(0,"Not Found",null);
    else 
      resJson = resObj(1,"Users data",results);

    return res.json(resJson);
  });
};

var update = (req,res)=>{
  var updating = req.body;
  
  service.update(req.params.id,updating,(err,result)=>{
    return res.json(defaultAnswer(err,result));
  });
};

var _delete = (req,res)=>{
  service.delete(req.params.id,(err,result)=>{      
    return res.json(defaultAnswer(err,result));
  });
};

module.exports = {
  create: create,
  read: read, 
  update: update, 
  delete: _delete
};
