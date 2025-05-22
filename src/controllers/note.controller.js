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
