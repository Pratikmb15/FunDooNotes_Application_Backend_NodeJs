import HttpStatus from 'http-status-codes';
import * as labelService from '../services/label.service';

export const addlabel = async (req, res) => {
    try {
        const { userId } = res.locals.user;

        const result = await labelService.addLabel(userId, req.body);
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
};

export const getAllLabels = async (req, res) => {
    try {
        const { userId } = res.locals.user;
        const { noteId } = req.body;

        const result = await labelService.getAllLabels(userId, noteId);
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

export const getlabelById = async (req, res) => {
    try {
        const { userId } = res.locals.user;
        const { noteId } = req.body;
        const { labelId } = req.params;

        const result = await labelService.getlabelById(userId, noteId, labelId);
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

export const deleteLabel = async (req, res) => {
    try {
        const { userId } = res.locals.user;
        const { labelId } = req.params;
        const result = await labelService.deleteLabel(userId, labelId);
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


