const router = require('express').Router();
const service = require('./service.js');

router.get('/rsk',service.raskroi);
router.get('/about',service.about);
router.get('/orders',service.orders);
router.get('/orders/armatura/:id',service.armatura);
router.get('/orders/rascroi/:id',service.rascroi);
router.get('/',service.main);

module.exports = router;