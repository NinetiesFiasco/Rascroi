const rounter = require('express').Router();


router.get("/enter",(req,res,next)=>{
    res.render("enter.hbs",{
        title: "Вход",
        authorized: res.locals.authorized
    });
});
router.get("/registration",(req,res,next)=>{
    res.render("registration.hbs",{
        title: "Регистрация",
        authorized: res.locals.authorized
    });
});

module.exports = router;