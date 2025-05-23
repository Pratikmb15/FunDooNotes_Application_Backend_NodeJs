import { Label } from "../models/label";
import sequelize from '../config/database';

export const addLabel=async(userId,body)=>{
    try{
    const {noteId}=body;
    const {labelName}=body;
    const label=await Label.findOne({where:{userId,noteId}})
    if(label){
        return {success:false,message:'label already exists'};
    }
    await sequelize.query(
        `INSERT INTO "Labels" ("labelName", "noteId", "userId", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        {
          bind: [labelName, noteId, userId],
          type: sequelize.QueryTypes.INSERT
        }
      );
return {success:true,message:'Label created successfully'};
}catch (error) {
    console.error("Error in adding label:", error);
    return {
        success: false,
        message: `Error  in adding label: ${error.message}`
    };
}
};