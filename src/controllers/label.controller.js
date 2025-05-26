import HttpStatus from 'http-status-codes';
import * as labelService from '../services/label.service';

export const addlabel = async (req, res) => {
    try {
        const { userId } = res.locals.user;

        const result = await labelService.addLabel(userId, req.body);

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

export const getAllLabels = async (req, res) => {
    try {
        const { userId } = res.locals.user;
        const { noteId } = req.body;

        const result = await labelService.getAllLabels(userId, noteId);
        
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

export const getlabelById = async (req, res) => {
    try {
        const { userId } = res.locals.user;
        const { noteId } = req.body;
        const { labelId } = req.params;

        const result = await labelService.getlabelById(userId, noteId, labelId);
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

export const deleteLabel = async (req, res) => {
    try {
        const { userId } = res.locals.user;
        const { labelId } = req.params;
        const result = await labelService.deleteLabel(userId, labelId);
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


