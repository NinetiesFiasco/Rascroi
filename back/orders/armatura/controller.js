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
 return{
  success: state,
  message: message,
  data: data
 }
}

var add = (req,res) => {
  var adding = req.body;
  adding.dateadd = Date.now();
  adding.login = res.locals.user.login;
  
  service.add(adding, (err,result)=>{
    return res.json(defaultAnswer(err,result));
  });
};

var update = (req,res)=>{
  var updating = req.body;
  updating.login = res.locals.user.login;
  
  service.update(req.params.id,updating,(err,result)=>{
    return res.json(defaultAnswer(err,result));
  });
};

var del = (req,res)=>{
  service.delete(req.params.id,(err,result)=>{      
    return res.json(defaultAnswer(err,result));
  });
};

var getByCart = (req,res)=>{      
  const id = req.params.id;
  
  service.getByCart(id,(err,result)=>{
    let resJson;

    if (err) 
      resJson = resObj(2,"SQL Trouble",err);
    else if (!result) 
      resJson = resObj(0,"Don't exists",null);
    else 
      resJson = resObj(1,"exists",result);
    
    return res.json(resJson);
  });
};

var getAll = (req,res)=>{
  service.getAll((err,results)=>{
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

module.exports = {
  add: add, 
  update: update, 
  delete: del, 
  getByCart: getByCart,
  getAll: getAll
};