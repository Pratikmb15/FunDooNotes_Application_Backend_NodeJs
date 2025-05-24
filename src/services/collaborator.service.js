import { Collaborator } from '../models/collaborator';
import sequelize from '../config/database';


export const addCollaborator = async (userId, noteId, email) => {
    try{
    const isCollaborator = await Collaborator.findOne({ where: { userId: userId, noteId: noteId, email: email } });
    if (isCollaborator) {
        return { success: false, message: 'This Collaborator already exists' };
    }
    await sequelize.query(
        `INSERT INTO "Collaborators" ("email", "noteId", "userId", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        {
            bind: [email, noteId, userId],
            type: sequelize.QueryTypes.INSERT
        }
    );
    return { success: true, message: 'collaborator added successfully' };
} catch (error) {
    console.error("Error in adding collaborator:", error);
    return {
        success: false,
        message: `Error  in adding collaborator: ${error.message}`
    };
}
}