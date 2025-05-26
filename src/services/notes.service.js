import { Note } from "../models/note.js";
import HttpStatus from 'http-status-codes';


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
            code: HttpStatus.CREATED ,
            message: "Note created successfully"
        };
    } catch (error) {
        console.error("Error creating note:", error);
        return {
            success: false,
            code: HttpStatus.INTERNAL_SERVER_ERROR ,
            message: `Error creating note: ${error.message}`
        };
    }
};

export const updateNote = async (userId, noteId, updateData) => {
    try {
        const note = Note.findOne({ where: { noteId: noteId, userId: userId } });
        if (!note) {
            return { success: false, code: HttpStatus.BAD_REQUEST ,message: 'No note found' };
        }
        await Note.update(updateData, { where: { noteId: noteId, userId: userId } });
        return { success: true,code: HttpStatus.ACCEPTED , message: 'Note Updated successfully' };
    } catch (error) {
        console.error("Error updating note:", error);
        return {
            success: false,
            code: HttpStatus.INTERNAL_SERVER_ERROR ,
            message: `Error updating note: ${error.message}`
        };
    }
}
export const getAllNotes = async (userId) => {
    try {
        const notes = await Note.findAll({ where: { userId: userId } });
        if (!notes || notes.length === 0) {
            return { success: false,code: HttpStatus.BAD_REQUEST , message: 'No Notes Found', data: [] };

        }
        return { success: true,code: HttpStatus.OK , message: 'Notes fetched successfully', data: notes };

    } catch (error) {
        console.error("Error fetching notes:", error);
        return {
            success: false,
            code: HttpStatus.INTERNAL_SERVER_ERROR ,
            message: `Error fetching notes: ${error.message}`
        };
    }

};

export const getNoteById = async (userId, noteId) => {
    try {
        const note = await Note.findOne({ where: { userId: userId, noteId: noteId } });
        if (!note || note.length === 0) {
            return { success: false, code: HttpStatus.BAD_REQUEST , message: 'No Note Found', data: [] };

        }
        return { success: true, code: HttpStatus.OK , message: 'Notes fetched successfully', data: note };

    } catch (error) {
        console.error("Error fetching note:", error);
        return {
            success: false,
            code: HttpStatus.INTERNAL_SERVER_ERROR ,
            message: `Error fetching note: ${error.message}`
        };
    }

}

export const toggleTrashNote = async (userId, noteId) => {
    try {
        const note = await Note.findOne({ where: { userId: userId, noteId: noteId } });
        if (!note) {
            return { success: false, code: HttpStatus.BAD_REQUEST ,message: 'No note Found' };
        }
        note.isTrashed = !note.isTrashed;
        await note.save();
        return { success: true,code: HttpStatus.ACCEPTED , message: `Toggled note trash successfully` };
    } catch (error) {
        console.error("Error in toggle trash note:", error);
        return {
            success: false,
            code: HttpStatus.INTERNAL_SERVER_ERROR ,
            message: `Error in toggle trash note: ${error.message}`
        };
    }
};

export const toggleArchiveNote = async (userId, noteId) => {
    try {
        const note = await Note.findOne({ where: { userId: userId, noteId: noteId } });
        if (!note) {
            return { success: false,code: HttpStatus.BAD_REQUEST , message: 'No note Found' };
        }
        if(note.isTrashed){
            return {success:false,code: HttpStatus.BAD_REQUEST ,message:'Note is in trash cannot archive it'}
        }
        note.isArchived = !note.isArchived;
        await note.save();
        return { success: true,code: HttpStatus.ACCEPTED , message: `Toggled archive note successfully` };
    } catch (error) {
        console.error("Error in toggle archive note:", error);
        return {
            success: false,
            code: HttpStatus.INTERNAL_SERVER_ERROR ,
            message: `Error in toggle archive note: ${error.message}`
        };
    }
};

export const deleteNoteForever = async (userId, noteId) => {
    try {
        const note = await Note.findOne({ where: { userId: userId, noteId: noteId } });
        if (!note) {
            return { success: false, code: HttpStatus.BAD_REQUEST ,message: 'No note Found' };
        }
       
       await Note.destroy({ where: { userId: userId, noteId: noteId } })
       
        return { success: true,  code: HttpStatus.ACCEPTED , message: `Note successfully deleted forever` };
    } catch (error) {
        console.error("Error in deleting note forever:", error);
        return {
            success: false,
            code: HttpStatus.INTERNAL_SERVER_ERROR ,
            message: `Error in deleting note forever: ${error.message}`
        };
    }
};

