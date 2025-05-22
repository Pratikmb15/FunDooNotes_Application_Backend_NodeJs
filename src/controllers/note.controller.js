import HttpStatus from 'http-status-codes';
import * as notesService from '../services/notes.service'

export const createNote = async (req, res) => {
    try {
        const { userId } = res.locals.user;

        const result = await notesService.addNewNote(userId, req.body);
        if (!result.success) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                success: false,
                message: result.message
            });
        }
        return res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            success: result.success,
            message: result.message
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
        if (!result.success) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                success: false,
                message: result.message
            });
        }
        return res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            success: result.success,
            message: result.message
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
  
      if (!result.success) {
        return res.status(404).json({
          success: false,
          message: result.message,
          data: []
        });
      }
  
      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  export const getNotebyId = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const noteId = req.params.noteId;
      const result = await notesService.getNoteById(userId,noteId);
  
      if (!result.success) {
        return res.status(404).json({
          success: false,
          message: result.message,
          data: []
        });
      }
  
      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  export const toggleTrashNote = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { noteId } = req.params;
  
      const result = await notesService.toggleTrashNote(userId, noteId);
  
      if (!result.success) {
        return res.status(404).json({
            success: false,
            message: result.message
          });
      }
  
      return res.status(200).json({
        success: true,
        message: result.message
      });
  
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  export const toggleArchiveNote = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { noteId } = req.params;
  
      const result = await notesService.toggleArchiveNote(userId, noteId);
  
      if (!result.success) {
        return res.status(404).json({
            success: false,
            message: result.message
          });
      }
  
      return res.status(200).json({
        success: true,
        message: result.message
      });
  
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  export const deleteNoteForever = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { noteId } = req.params;
  
      const result = await notesService.deleteNoteForever(userId, noteId);
  
      if (!result.success) {
        return res.status(404).json({
            success: false,
            message: result.message
          });
      }
  
      return res.status(200).json({
        success: true,
        message: result.message
      });
  
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  
