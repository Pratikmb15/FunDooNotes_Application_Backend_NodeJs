import express from 'express';
import * as labelController from '../controllers/label.controller';
import { userAuth } from '../middlewares/auth.middleware';
import {getLabelsValidator, newLabelValidator} from '../validators/labels.validator';

const router = express.Router();

router.post('',userAuth,newLabelValidator,labelController.addlabel);
router.get('',userAuth,labelController.getAllLabels);
router.get('/:labelId',userAuth,labelController.getlabelById);
router.delete('/:labelId',userAuth,labelController.deleteLabel);


export default router;