import express from 'express'
import upload from '../middleware/imageUpload.js';
import dressController from "../controller/dressController.js"

const router = express.Router();

router.post('/add', upload.single('dressimage'), dressController.addDress);

router.get('/', dressController.getAllDress);
router.put('/:id', upload.single('dressimage'), dressController.updateDress);
router.get('/:id', dressController.getDressById);
router.get('/name/:name', dressController.getDressByName);
router.delete('/:id', dressController.deleteDress);

export default router