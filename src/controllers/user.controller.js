import HttpStatus from 'http-status-codes';
import * as userService from '../services/user.service'


export const registerUser = async (req, res) => {
  try {
    req.body.role = 'User';
    const result = await userService.addNewUser(req.body);
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        success: false,
        message: result.message
      });
    }
    return res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      success: result.success,
      message: result.message
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
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        success: false,
        message: result.message
      });
    }
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
      message: 'User Login successfully ',
      data: result.token
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
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        success: false,
        message: result.message
      });
    }
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
      message: result.message,
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
    if(!result.success){
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        success: false,
        message: result.message
      });
    }
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
      message: result.message
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });
  }
};
