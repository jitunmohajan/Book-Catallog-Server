import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getAllFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Users  retrieved successfully',
        data: result
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.getByIdFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User fetched successfully',
        data: result
    });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.updateOneInDB(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User  updated successfully',
        data: result
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.deleteByIdFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User deleted successfully',
        data: result
    });
});



export const UserController = {
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB,
}