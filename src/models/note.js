import sequelize from '../config/database';
import { DataTypes } from 'sequelize';
import { User } from './user';

const Note = sequelize.define('Note',{
    noteId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    color:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isTrashed:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    isArchived:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    userId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // table name as in DB
            key: 'userId'
          },
          onDelete: 'CASCADE'
      }
});

User.hasMany(Note,{foreignKey:'userId'});
Note.belongsTo(User,{foreignKey:'userId'});
export {Note};
