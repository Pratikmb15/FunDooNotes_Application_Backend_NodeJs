import sequelize from '../config/database';
import { DataTypes } from 'sequelize';
import { User } from './user';
import {Note} from './note';

const Collaborator = sequelize.define('Collaborator',{
    collaboratorId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,        
    },
    email : {
        type:DataTypes.STRING,
        allowNull:false
    },
    noteId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Notes', 
            key: 'noteId'
          },
          onDelete: 'CASCADE'
      }
    ,
    userId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', 
            key: 'userId'
          },
          onDelete: 'CASCADE'
      }
},{
    tableName:'Collaborators',timestamps:true
});
Note.hasMany(Collaborator,{foreignKey:'noteId'});
Collaborator.belongsTo(Note,{foreignKey:'noteId'});

User.hasMany(Collaborator,{foreignKey:'userId'});
Collaborator.belongsTo(User,{foreignKey:'userId'});

export {Collaborator};