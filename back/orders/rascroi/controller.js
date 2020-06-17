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

module.exports = {
  getByCart: getByCart
};