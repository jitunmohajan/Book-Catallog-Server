import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ProfileService } from "./profile.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getProfile = catchAsync(async (req: Request, res: Response) => {

    const token = req.headers.authorization;
    const result = await ProfileService.getProfile(token);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Profile retrieved successfully',
        data: result
    });
});

export const ProfileController ={
    getProfile
}

