const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/add', controller.add);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);
router.get('/getByCart/:id', controller.getByCart);
router.get('/getAll', controller.getAll);

module.exports = router;