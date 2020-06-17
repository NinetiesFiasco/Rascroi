const router = require('express').Router();
const {
    enterPage,
    enter,
    exit,
    testLogin
} = require('./controller.js');

router.get("/",enterPage);

router.get("/itsMe", testLogin);

router.post("/",enter);

router.get("/exit",exit);

module.exports = router;