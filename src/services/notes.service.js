import { Note } from "../models/note.js";

export const addNewNote = async (userId, body) => {
    try {
        const newNote = {
            title: body.title,
            description: body.description,
            color: body.color || 'white',
            isTrashed: false,
            isArchived: false,
            userId: userId
        }
        await Note.create(newNote);
        return {
            success: true,
            message: "Note created successfully"
        };
    } catch (error) {
        console.error("Error creating note:", error);
        return {
            success: false,
            message: `Error creating note: ${error.message}`
        };
    }
};

export const updateNote = async (userId, noteId, updateData) => {
    try {
        const note = Note.findOne({where:{noteId:noteId,userId:userId}});
        if (!note) {
            return { success: false, message: 'No note found' };
        }
        await Note.update(updateData,{where:{noteId:noteId,userId:userId}});
        return { success: true, message: 'Note Updated successfully' };
    } catch (error) {
        console.error("Error creating note:", error);
        return {
            success: false,
            message: `Error creating note: ${error.message}`
        };
    }
}