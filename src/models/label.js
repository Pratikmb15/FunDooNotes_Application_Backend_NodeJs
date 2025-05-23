import sequelize from '../config/database';
import { DataTypes } from 'sequelize';
import { User } from './user';
import {Note} from './note';

const Label = sequelize.define('Label',{
    labelId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,        
    },
    labelName : {
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
    tableName:'Labels',timestamps:true
});
Note.hasMany(Label,{foreignKey:'noteId'});
Label.belongsTo(Note,{foreignKey:'noteId'});

User.hasMany(Label,{foreignKey:'userId'});
Label.belongsTo(User,{foreignKey:'userId'});

export {Label};