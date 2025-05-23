import express from 'express';
import * as labelController from '../controllers/label.controller';
import { userAuth } from '../middlewares/auth.middleware';
import {newLabelValidator} from '../validators/labels.validator';

const router = express.Router();

router.post('',userAuth,newLabelValidator,labelController.addlabel);

export default router;