import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

const createUser = catchAsync(async (req: Request, res: Response) =>{
    const result = await AuthService.createUser(req.body);
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "User created successfully!",
        data: result
    })
})

export const AuthController ={
    createUser
}