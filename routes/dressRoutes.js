const express = require('express');
const router = express.Router();
const upload = require('../middleware/imageUpload'); // Import upload middleware
const dressController = require('../controller/dressController'); // Import controller

router.post('/add', upload.single('dressimage'), dressController.addDress);

router.get('/', dressController.getAllDress);

router.get('/:id', dressController.getDressById);
router.get('/name/:name', dressController.getDressByName);
router.delete('/:id', dressController.deleteDress);

module.exports = router;