 const {
     client,
     ObjectID
 } = require('../../dbConfig/mongo.js');
 
const {
    redisClient
} = require('../../dbConfig/redis.js');

 
const UsersCollection = client().db("RaskroiAccount").collection("Users");


var checkUser = (user,callBack,next)=>{
    
    UsersCollection.findOne({login:user.login}, (err,result)=>{
       if (err) return callBack(err);
       
       if (result)
            callBack({
                success:0,
                message: "Логин занят"
            });
        else
            next(user,callBack);
    });
}
var saveUser = (data,callBack)=>{
    checkUser(data,callBack,insertUser);
};

var insertUser = (user,callBack,next)=>{
    UsersCollection.insertOne(user, function(err, result){
        if(err) return callBack(err);
        callBack(null,result.ops);
    });
}

var getAll = (callBack)=>{
    UsersCollection.find().toArray(function(err, results){
        if (err)return callBack(err);
        callBack(null,results);
    });
};

var deleteUser = (user,callBack,next)=>{
    UsersCollection.deleteOne({"_id":ObjectID(user._id)},function(err,result){
        if (err)return callBack(err);
        callBack(null,result);
    });
};

var updateUser = (user,callBack,next)=>{

    redisClient().hmset("rsk:"+user._id,user);

    delete(user._id);
    delete(user.login);
    delete(user.password);
    
    UsersCollection.updateOne(
        {"_id":ObjectID(user._id)},
        {$set:user},
        function(err,result){
            return callBack(err,result);
        }
    );
    


}

var updatePassword = (user,callBack,next)=>{
    UsersCollection.findOne({login:user.login,password:user.password}, (err,result)=>{
       if (err) return callBack(err);
       
       if (result)
            saveNewPassword(user,callBack);
        else
            callBack({
                success:0,
                message: "Неверные логин или пароль"
            });
    });
}
var saveNewPassword = (user,callBack,next)=>{
    UsersCollection.updateOne(
        {"login":user.login},
        {$set:{"password":user.newPassword}},
        function(err,result){
            return callBack(err,result);
        }
    );
}

module.exports = {
    saveUser: saveUser,
    getUsers: getAll,
    deleteUser: deleteUser,
    updateUser: updateUser,
    updatePassword: updatePassword
}