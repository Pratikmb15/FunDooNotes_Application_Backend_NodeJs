import express from 'express';
import * as collaboratorController from '../controllers/collaborator.controller.js';
import { userAuth } from '../middlewares/auth.middleware';
import { newCollaboratorValidator } from '../validators/collaborator.validator';

const router = express.Router();

router.post('',userAuth,newCollaboratorValidator,collaboratorController.addCollaborator);


export default router;