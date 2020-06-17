const router = require('express').Router();
const {
    registrationPage,
    registrationData,
    deleteMe,
    userUpdate,
    userUpdatePassword
} = require('./controller.js');

router.get("/",registrationPage);

router.post("/data",registrationData);

router.post("/update",userUpdate);

router.post("/updatepassword",userUpdatePassword);

router.get("/deleteMe",deleteMe);

module.exports = router;