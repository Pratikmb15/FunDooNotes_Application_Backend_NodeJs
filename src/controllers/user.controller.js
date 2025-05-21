import HttpStatus from 'http-status-codes';
import * as userService from '../services/user.service'


export const registerUser = async (req, res, next) => {
  try {
    req.body.role = 'User';
    const result = await userService.addNewUser(req.body);
    if (!result) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        success: false,
        data: result,
        message: 'User registeration Failed'
      });
    }
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: result,
      message: 'User registered successfully...'
    });
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      success: false,
      message: error.message
    });

  }
}

export const loginUser = async (req, res, next) => {
  try {
    const result = await userService.loginUser(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
      message: 'User Login successfully ',
      data: result
    })
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      success: false,
      message: error.message
    });

  }
}

export const forgotPassword = async (req, res, next) => {
  try {
    
    const result = await userService.forgotPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      success: false,
      message: error.message,
    });
  }

}
