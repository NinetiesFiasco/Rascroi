const {
    getUser
} = require('./service.js');

const {
    redisClient
} = require('../../dbConfig/redis.js');

const {createToken} = require('../tokens/tok.js');

const md5 = require('md5');

var enterPage = (req,res,next)=>{
    res.render("enter.hbs",{
        title: "Вход",
        scripts: [
            "/clientScript/enter.js"
        ],
        authorized: res.locals.authorized
    });
};

var enter =  (req,res,next)=>{
    let data = req.body
    
    data.password = md5(data.login + process.env.SITE_PASSWORD_SALT + data.password);
    
    getUser(data,(err,user)=>{
        if (err) return res.json(err);
        
        if (!user) return res.json({
            success: 0,
            message: "Пользователь не найден"
        });
        
        let token = createToken(user);
        
        user._id = user._id.toString();
        
        redisClient().hmset("rsk:"+user._id,user);
        redisClient().expire("rsk:"+user._id,1*24*60*1000);
        
        res.cookie("Token",token, { maxAge: 1*24*60*60*1000, httpOnly: true });
       
        res.json({
            success: 1,
            message: "Успешный вход",
            redirect: "/",
            token: token,
        });
    });
};

var exit = (req,res,next)=>{
    res.cookie('Token',{},{maxAge:0});
    res.redirect('/');
};

var testLogin = (req,res,next)=>{
    if (!res.locals.user){
        res.json({
            "message":"Вы не авторизованы"
        });
    }
    res.json({
        "message":"Вы авторизованы",
        "user": res.locals.user
    });
};

module.exports = {
    enterPage: enterPage,
    enter: enter,    
    exit: exit,
    testLogin: testLogin
}