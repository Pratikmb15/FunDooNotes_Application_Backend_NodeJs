import HttpStatus from 'http-status-codes';
import * as collaboratorService from '../services/collaborator.service';

export const addCollaborator = async (req, res) => {
    try {
        const { userId } = res.locals.user;
        const { noteId } = req.body;
        const { email } = req.body;

        const result = await collaboratorService.addCollaborator(userId, noteId, email);
      
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

export const getAllCollaborators = async (req, res) => {
    try {
        const { userId } = res.locals.user;
        const { noteId } = req.query;

        const result = await collaboratorService.getAllCollaborators(userId, noteId);
        
        return res.status(result.code).json({
            result
        });
    }
    catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message
        });
    }
};

export const getCollaboratorById = async (req, res) => {
    try {
        const { userId } = res.locals.user;
        const { noteId } = req.query;
        const { collaboratorId } = req.params;

        const result = await collaboratorService.getCollabratorById(userId, noteId,collaboratorId);
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
            message: result.message,
            data: result.data
        });
    }
    catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message
        });
    }
};

export const deleteCollaborator = async (req, res) => {
    try {
        const { userId } = res.locals.user;
        const { collaboratorId } = req.params;
        const result = await collaboratorService.deleteCollaborator(userId, collaboratorId);
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
            message: result.message,
            data: result.data
        });

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message
        });
    }
};
