import express from 'express';
import * as collaboratorController from '../controllers/collaborator.controller.js';
import { userAuth } from '../middlewares/auth.middleware';
import { newCollaboratorValidator,getCollaboratorValidator } from '../validators/collaborator.validator';

const router = express.Router();

router.post('',userAuth,newCollaboratorValidator,collaboratorController.addCollaborator);
router.get('',userAuth,getCollaboratorValidator,collaboratorController.getAllCollaborators);
router.get('/:collaboratorId',userAuth,getCollaboratorValidator,collaboratorController.getCollaboratorById);


export default router;