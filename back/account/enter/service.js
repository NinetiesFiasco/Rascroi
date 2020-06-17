 const {
     client
 } = require('../../dbConfig/mongo.js');
 
const UsersCollection = client().db("RaskroiAccount").collection("Users");

var getUser = (data,callBack)=>{
    UsersCollection.findOne(data, function(err, result){
        if(err) return callBack(err);
        if (!result) return callBack({
            success: 0,
            message: "Логин или пароль неверны"
        });
        callBack(null, result);
    });
};


module.exports = {
    getUser: getUser
}