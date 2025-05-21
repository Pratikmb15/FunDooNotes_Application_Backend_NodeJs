import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token.js';
import { generateResetToken } from '../utils/token.js';
import { sendEmail } from '../utils/email.js';


export const addNewUser = async (body) => {
  const existingUser = await User.findOne({ where: { email: body.email } });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hasedPassword = await bcrypt.hash(body.password, 10);

  const newuser = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: hasedPassword
  }
  console.log('Creating User with data:', newuser);

  const data = await User.create(newuser);
  console.log("Added user successfully");
  return data;
}

export const loginUser = async (body) => {
  const user = await User.findOne({ where: { email: body.email } });
  if (!user) {
    throw new Error('User does\'nt exists');
  }
  const isValidCredentials = await bcrypt.compare(body.password, user.password);
  if (!isValidCredentials) {
    throw new Error('Invalid Credentials');
  }
  const token = generateToken({ userId: user.userId, email: user.email });
  return { token: token };
}

export const forgotPassword = async (body) => {
  const user = await User.findOne({ where: { email:body.email } });
  if (!user) {
    throw new Error('User not found');
  }
  const token = generateResetToken({ userId: user.userId, email: user.email });
  const resetLink = `${process.env.FRONTEND_URL}/Resetpassword?token=${token}`;
  const subject = 'Password Reset Request';
  const html = `<p>You requested a password reset. Click the link below to reset your password:</p>
                <p><a href=${resetLink} target='_blank'>Reset Password</a></p>
                <p>If you did not request this, please ignore this email.</p>`;
  await sendEmail(user.email, subject, html);
  return { message: 'Password reset link sent successfully to your email.' };
}