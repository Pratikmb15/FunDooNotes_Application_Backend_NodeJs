import express from 'express';
import * as collaboratorController from '../controllers/collaborator.controller.js';
import { userAuth } from '../middlewares/auth.middleware';
import { newCollaboratorValidator,getCollaboratorValidator } from '../validators/collaborator.validator';

const router = express.Router();

router.post('',userAuth,newCollaboratorValidator,collaboratorController.addCollaborator);
router.get('',userAuth,collaboratorController.getAllCollaborators);
router.get('/:collaboratorId',userAuth,collaboratorController.getCollaboratorById);
router.delete('/:collaboratorId',userAuth,collaboratorController.deleteCollaborator);

export default router;