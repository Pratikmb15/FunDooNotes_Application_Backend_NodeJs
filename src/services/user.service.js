import {User} from '../models/user.js' ;
import bcrypt from 'bcrypt';

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