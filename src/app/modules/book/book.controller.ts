import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookService } from "./book.service";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constant";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.insertIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Book created successfully',
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);
    console.log(filters);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder', 'minPrice', 'maxPrice', 'category','search']);
    const result = await BookService.getAllFromDB(filters, options);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Books fetched successfully',
        data: result
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookService.getByIdFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Book fetched successfully',
        data: result
    });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookService.updateOneInDB(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Book updated successfully',
        data: result
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookService.deleteByIdFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Book delete successfully',
        data: result
    });
});

const getCategoryBooksByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const options = pick(req.query, ['limit', 'page']);
    const result = await BookService.getCategoryBooksByIdFromDB(categoryId, options);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Book fetched successfully',
        data: result
    });
});

export const BookController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB,
    getCategoryBooksByIdFromDB
}