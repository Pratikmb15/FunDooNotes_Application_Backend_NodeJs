import HttpStatus from 'http-status-codes';
import * as userService from '../services/user.service'


export const registerUser = async (req, res) => {
  try {
    req.body.role = 'User';
    const result = await userService.addNewUser(req.body);
    return res.status(result.code).json({
      result
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });

  }
}

export const loginUser = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);
   
    return res.status(result.code).json({
      result
    })
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });

  }
}

export const forgotPassword = async (req, res) => {
  try {

    const result = await userService.forgotPassword(req.body); 
    return res.status(result.code).json({
      result
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }

}

export const resetPassword = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { newPassword } = req.body;

    const result = await userService.resetPassword(userId, newPassword);
   
    return res.status(result.code).json({
      result
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });
  }
};
