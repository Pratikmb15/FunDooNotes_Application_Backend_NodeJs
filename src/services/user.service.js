import { where } from 'sequelize';
import {User} from '../models/user.js' ;
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token.js';

export const addNewUser=async (body) =>{
const existingUser = await User.findOne({where:{email:body.email}});

if(existingUser){
 throw new Error('User already exists');
}

const hasedPassword = await  bcrypt.hash(body.password,10);

const newuser={
  firstName:body.firstName,
  lastName:body.lastName,
  email:body.email,
  password:hasedPassword
}
console.log('Creating User with data:', newuser);

const data = await User.create(newuser);
console.log("Added user successfully");
return data ; 
}

export const loginUser = async (body)=>{
  const user = await User.findOne({where:{email:body.email}});
  if(!user){
    throw new Error('User does\'nt exists');
  }
  const isValidCredentials = await bcrypt.compare(body.password,user.password);
  if(!isValidCredentials){
    throw new Error('Invalid Credentials');
  }
  const token =generateToken({userId:user.userId,email:user.email});
  return {token:token};
}