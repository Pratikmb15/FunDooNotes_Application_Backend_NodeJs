import express from 'express';
import * as notesController from '../controllers/note.controller'
import { newNoteValidator } from '../validators/notes.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('',userAuth,newNoteValidator,notesController.createNote);
router.put('/:noteId',userAuth,newNoteValidator,notesController.updateNote);
router.get('',userAuth,notesController.getAllNotes);
router.get('/:noteId',userAuth,notesController.getNotebyId);
router.patch('/trash/:noteId', userAuth, notesController.toggleTrashNote);
router.patch('/archive/:noteId', userAuth, notesController.toggleArchiveNote);
router.delete('/:noteId',userAuth,notesController.deleteNoteForever);

export default router;