import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token.js';
import { generateResetToken } from '../utils/token.js';
import { sendEmail } from '../utils/email.js';


export const addNewUser = async (body) => {
  try {
    const existingUser = await User.findOne({ where: { email: body.email } });

    if (existingUser) {
      return { success: false, message: 'User already exists' };
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
    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: `Error registering user: ${error}` };
  }
}

export const loginUser = async (body) => {
  try {
    const user = await User.findOne({ where: { email: body.email } });
    if (!user) {
      return { success: false, message: 'User does\'nt exists' };
    }
    const isValidCredentials = await bcrypt.compare(body.password, user.password);
    if (!isValidCredentials) {
      return { success: false, message: 'Invalid Credentials' }
    }
    const token = generateToken({ userId: user.userId, email: user.email });
    return { success: true, token: token };
  } catch (error) {
    console.error('User Login failed:', error);
    return { success: false, message: `Error in user login : ${error}` };
  }
}

export const forgotPassword = async (body) => {
  try {
    const user = await User.findOne({ where: { email: body.email } });
    if (!user) {
      return { success: false, message: 'User not found' }
    }
    const token = generateResetToken({ userId: user.userId, email: user.email });
    const resetLink = `${process.env.FRONTEND_URL}/Resetpassword?token=${token}`;
    const subject = 'Password Reset Request';
    const html = `<p>You requested a password reset. Click the link below to reset your password:</p>
                <p><a href=${resetLink} target='_blank'>Reset Password</a></p>
                <p>If you did not request this, please ignore this email.</p>`;
    await sendEmail(user.email, subject, html);
    return {success:true, message: 'Password reset link sent successfully to your email.' };
  } catch (error) {
    console.error('Forgot password failed:', error);
    return { success: false, message: `Error in Forgot password : ${error}` };
  }
}

export const resetPassword = async (userId, newPassword) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    return { success: true, message: 'Password reset successful' };
  } catch (error) {
    console.error('reset password failed:', error);
    return { success: false, message: `Error in reset password : ${error}` };
  }
};
