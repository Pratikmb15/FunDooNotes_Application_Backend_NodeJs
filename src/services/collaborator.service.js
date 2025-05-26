import { Collaborator } from '../models/collaborator';
import sequelize from '../config/database';
import HttpStatus from 'http-status-codes';


export const addCollaborator = async (userId, noteId, email) => {
    try{
    const isCollaborator = await Collaborator.findOne({ where: { userId: userId, noteId: noteId, email: email } });
    if (isCollaborator) {
        return { success: false,code: HttpStatus.BAD_REQUEST , message: 'This Collaborator already exists' };
    }
    await sequelize.query(
        `INSERT INTO "Collaborators" ("email", "noteId", "userId", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        {
            bind: [email, noteId, userId],
            type: sequelize.QueryTypes.INSERT
        }
    );
    return { success: true,code: HttpStatus.CREATED , message: 'collaborator added successfully' };
} catch (error) {
    console.error("Error in adding collaborator:", error);
    return {
        success: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR ,
        message: `Error  in adding collaborator: ${error.message}`
    };
}
}

export const getAllCollaborators =async (userId,noteId)=>{
    try{
        const collaborators = await sequelize.query(
            `SELECT * FROM "Collaborators" 
             WHERE "userId" = $1 AND "noteId" = $2`,
            {
                bind: [userId, noteId],
                type: sequelize.QueryTypes.SELECT
            }
        );
        if (collaborators.length === 0) {
            return {
                success: true,
                code: HttpStatus.OK ,
                message: 'No collaborators found for this note.',
                data: []
            };
        }
        
        return { success: true,code: HttpStatus.OK , message: 'Fetched Collaborators successfully', data: collaborators };
    } catch (error) {
        console.error("Error in fetching collaborators :", error);
        return {
            success: false,
            code: HttpStatus.INTERNAL_SERVER_ERROR ,
            message: `Error  in fetching collaborators : ${error.message}`
        };
    }
};

export const getCollabratorById = async (userId, noteId,collaboratorId) => {
    try {

        const collaborator = await sequelize.query(
            `SELECT * FROM "Collaborators" 
             WHERE "userId" = $1 AND "noteId" = $2 AND "collaboratorId" = $3`,
            {
                bind: [userId, noteId,collaboratorId],
                type: sequelize.QueryTypes.SELECT
            }
        );
        if (collaborator.length === 0) {
            return {
                success: true,
                message: 'No collaborators found for this note.',
                data: []
            };
        }
        
        if(!collaborator || collaborator.count ==0){
            return {success:false,message:"collaborator not found"};
        }
        return { success: true, message: 'Fetched collaborator successfully', data: collaborator };
    } catch (error) {
        console.error("Error in fetching collaborator:", error);
        return {
            success: false,
            message: `Error  in fetching collaborator: ${error.message}`
        };
    }

};

export const deleteCollaborator = async (userId, collaboratorId) => { 
    try {
        const collaborator =await Collaborator.findByPk(collaboratorId);
        if(!collaborator){
            return {success:false,message:"collaborator not found"};
        }
        await sequelize.query(
            `DELETE FROM "Collaborators" 
             WHERE "collaboratorId" = $1 AND "userId" = $2`,
            {
                bind: [collaboratorId, userId],
                type: sequelize.QueryTypes.DELETE
            }
        );
        return { success: true, message: 'collaborator deleted successfully' };
          
    } catch (error) {
        console.error("Error in deleting collaborator:", error);
        return {
            success: false,
            message: `Error in deleting collaborator: ${error.message}`
        };
    }
};