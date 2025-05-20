import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET; 
const expiresIn = '1h';

export const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn });
};
