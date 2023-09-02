import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse } from "./auth.interface";
import { AuthService } from "./auth.service";

const createUser = catchAsync(async (req: Request, res: Response) =>{
    const result = await AuthService.createUser(req.body);
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "User created successfully!",
        data: result
    })
})

const signin = catchAsync(async (req: Request, res: Response) =>{
    const result = await AuthService.signin(req.body);
    const { refreshToken, token } = result;

    // set refresh token on cookie
    const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true,
    };
    
    res.cookie('refreshToken', refreshToken, cookieOptions);
    
    sendResponse<ILoginUserResponse>(res, {
        success: true,
        statusCode: 200,
        message: 'User signin successfully!',
        token: token,
    });
})

export const AuthController ={
    createUser,
    signin
}