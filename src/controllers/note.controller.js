import HttpStatus from 'http-status-codes';
import * as notesService from '../services/notes.service'

export const createNote = async (req, res) => {
  try {
    const { userId } = res.locals.user;

    const result = await notesService.addNewNote(userId, req.body);

    return res.status(result.code).json({
      result
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });
  }
}

export const updateNote = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const noteId = req.params.noteId;
    const result = await notesService.updateNote(userId, noteId, req.body);

    return res.status(result.code).json({
      result
    });

  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const result = await notesService.getAllNotes(userId);

    return res.status(result.code).json({
      result
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error.message
    });
  }
};

export const getNotebyId = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const noteId = req.params.noteId;
    const result = await notesService.getNoteById(userId, noteId);

    return res.status(result.code).json({
      result
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error.message
    });
  }
};

export const toggleTrashNote = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { noteId } = req.params;

    const result = await notesService.toggleTrashNote(userId, noteId);



    return res.status(result.code).json({
      result
    });

  } catch (error) {
    res.status(500).json({ success: false, code: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message });
  }
};

export const toggleArchiveNote = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { noteId } = req.params;

    const result = await notesService.toggleArchiveNote(userId, noteId);

    return res.status(result.code).json({
      result
    });

  } catch (error) {
    res.status(500).json({ success: false, code: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message });
  }
};

export const deleteNoteForever = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { noteId } = req.params;

    const result = await notesService.deleteNoteForever(userId, noteId);

    return res.status(result.code).json({
      result
    });

  } catch (error) {
    res.status(500).json({ success: false, code: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message });
  }
};


