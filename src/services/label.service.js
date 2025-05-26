import { Label } from "../models/label";
import sequelize from '../config/database';
import HttpStatus from 'http-status-codes';

export const addLabel = async (userId, body) => {
    try {
        const { noteId } = body;
        const { labelName } = body;
        const label = await Label.findOne({ where: { userId, noteId } })
        if (label) {
            return { success: false,code: HttpStatus.BAD_REQUEST , message: 'label already exists' };
        }
        await sequelize.query(
            `INSERT INTO "Labels" ("labelName", "noteId", "userId", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
            {
                bind: [labelName, noteId, userId],
                type: sequelize.QueryTypes.INSERT
            }
        );
        return { success: true,code: HttpStatus.CREATED , message: 'Label created successfully' };
    } catch (error) {
        console.error("Error in adding label:", error);
        return {
            success: false,
            code: HttpStatus.INTERNAL_SERVER_ERROR ,
            message: `Error  in adding label: ${error.message}`
        };
    }
};

export const getAllLabels = async (userId, noteId) => {
    try {

        const labels = await sequelize.query(
            `SELECT * FROM "Labels" 
             WHERE "userId" = $1 AND "noteId" = $2`,
            {
                bind: [userId, noteId],
                type: sequelize.QueryTypes.SELECT
            }
        );
        if (labels.length === 0) {
            return {
                success: true,
                code: HttpStatus.OK ,
                message: 'No labels found for this note.',
                data: []
            };
        }
        
        return { success: true,code: HttpStatus.OK , message: 'Fetched Labels successfully', data: labels };
    } catch (error) {
        console.error("Error in fetching labels :", error);
        return {
            success: false,
            code: HttpStatus.INTERNAL_SERVER_ERROR ,
            message: `Error  in fetching labels : ${error.message}`
        };
    }

}

export const getlabelById = async (userId, noteId,labelId) => {
    try {

        const labels = await sequelize.query(
            `SELECT * FROM "Labels" 
             WHERE "userId" = $1 AND "noteId" = $2 AND "labelId" = $3`,
            {
                bind: [userId, noteId,labelId],
                type: sequelize.QueryTypes.SELECT
            }
        );
        if (labels.length === 0) {
            return {
                success: true,
                code: HttpStatus.OK ,
                message: 'No label found for this note.',
                data: []
            };
        }
        
        return { success: true,code: HttpStatus.OK , message: 'Fetched Label successfully', data: labels };
    } catch (error) {
        console.error("Error in fetching label:", error);
        return {
            success: false,
            code: HttpStatus.INTERNAL_SERVER_ERROR ,
            message: `Error  in fetching label: ${error.message}`
        };
    }

};

export const deleteLabel = async (userId, labelId) => { 
    try {
        const label =await Label.findByPk(labelId);
        if(!label){
            return {success:false,code: HttpStatus.BAD_REQUEST ,message:"Label not found"};
        }
        await sequelize.query(
            `DELETE FROM "Labels" 
             WHERE "labelId" = $1 AND "userId" = $2`,
            {
                bind: [labelId, userId],
                type: sequelize.QueryTypes.DELETE
            }
        );
        return { success: true,code: HttpStatus.ACCEPTED , message: 'Label deleted successfully' };
          
    } catch (error) {
        console.error("Error in deleting label:", error);
        return {
            success: false,
            code: HttpStatus.INTERNAL_SERVER_ERROR ,
            message: `Error in deleting label: ${error.message}`
        };
    }
}

