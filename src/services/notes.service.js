import { Note } from "../models/note.js";

export const addNewNote = async (userId ,body)=>{
    try{
    const newNote ={
        title:body.title,
        description:body.description,
        color: body.color || 'white',
        isTrashed:false,
        isArchived:false,
        userId:userId
    }
    await Note.create(newNote);
    return {
        success: true,
        message: "Note created successfully"
      };
    }catch(error){
        console.error("Error creating note:", error);
        return {
          success: false,
          message: `Error creating note: ${error.message}`
        };
    }
};