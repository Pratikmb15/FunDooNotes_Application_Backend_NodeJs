import { Label } from "../models/label";
import sequelize from '../config/database';

export const addLabel = async (userId, body) => {
    try {
        const { noteId } = body;
        const { labelName } = body;
        const label = await Label.findOne({ where: { userId, noteId } })
        if (label) {
            return { success: false, message: 'label already exists' };
        }
        await sequelize.query(
            `INSERT INTO "Labels" ("labelName", "noteId", "userId", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
            {
                bind: [labelName, noteId, userId],
                type: sequelize.QueryTypes.INSERT
            }
        );
        return { success: true, message: 'Label created successfully' };
    } catch (error) {
        console.error("Error in adding label:", error);
        return {
            success: false,
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
        return { success: true, message: 'Fetched Labels successfully', data: labels };
    } catch (error) {
        console.error("Error in fetching labels :", error);
        return {
            success: false,
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
        return { success: true, message: 'Fetched Label successfully', data: labels };
    } catch (error) {
        console.error("Error in fetching label:", error);
        return {
            success: false,
            message: `Error  in fetching label: ${error.message}`
        };
    }

}