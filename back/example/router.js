const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/create', controller.create);
router.get('/read', controller.read);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

module.exports = router;
