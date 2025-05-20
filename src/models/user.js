import sequelize from '../config/database';
import { DataTypes } from 'sequelize';


const User = sequelize.define('User',{
  userId:{
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  firstName:{
    type:DataTypes.STRING,
    allowNull:false
  },
  lastName:{
    type:DataTypes.STRING,
    allowNull:false
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  }},{
    tableName:'Users',timestamps:true
});

export {User};