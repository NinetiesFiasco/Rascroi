const md5 = require('md5');
const {
    saveUser,
    getUsers,
    deleteUser,
    updateUser,
    updatePassword,
} = require('./service.js');

var registrationPage = (req,res,next)=>{        
    getUsers((err,data)=>{
        if (err) return res.send("Ошибочка вышла")
        
        res.render("registration.hbs",{
            title: "Регистрация",
            scripts: [
                "/clientScript/registration.js"
            ],
            user: res.locals.user
        });
    });
};

var registrationData = (req,res,next)=>{
    let data = req.body;

    data.password = md5(data.login + process.env.SITE_PASSWORD_SALT + data.password);
    
    saveUser(data,(error,obj)=>{
        
        if (error)
            return res.json(error);
        
        res.json({
            success:1,
            message:"Вы успешно зарегистрировались",
            redirect: "/enter"
        });
    });
}

var deleteMe = (req,res,next)=>{
    
    let data = res.locals.user;
    
    if (res.locals.user == null){
        res.json({
            success: 0,
            mesasge: "Вы не авторизованы"
        });
        return;
    }

    if (data.login != "userTst"){
        res.json({
            success: 0,
            message: "Удалить можно только тестового пользователя"
        });
        return;
    }

    deleteUser(data,(error,obj)=>{
        
        if (error)
            return res.json(error);
        
        res.json({
            success:1,
            message:"Пользователь удалён",
            redirect: "/"
        });
    });
}

var userUpdate = (req,res,next)=>{
    let user = req.body;    
    updateUser(user,(error,obj)=>{
        
        if (error)
            return res.json(error);
        
        res.json({
            success:1,
            message:"Данные обновлены",
            redirect: "/"
        });
    });
};

var userUpdatePassword = (req,res,next)=>{
    let data = req.body;
    
    data.password = md5(data.login + process.env.SITE_PASSWORD_SALT + data.password);
    data.newPassword = md5(data.login + process.env.SITE_PASSWORD_SALT+data.newPassword);

    updatePassword(data,(error,obj)=>{
        
        if (error)
            return res.json(error);
        
        res.json({
            success:1,
            message:"Пароль обновлён",
            redirect: "/enter"
        });
    });

};

module.exports = {
    registrationPage:registrationPage,    
    registrationData:registrationData,
    deleteMe: deleteMe,
    userUpdate: userUpdate,
    userUpdatePassword: userUpdatePassword
}