import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const result = await OrderService.insertIntoDB(token, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Book created successfully',
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const result = await OrderService.getAllFromDB(token);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Books fetched successfully',
        data: result
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const token = req.headers.authorization;
    const result = await OrderService.getByIdFromDB(token, orderId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Book fetched successfully',
        data: result
    });
});

export const OrderController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB
}