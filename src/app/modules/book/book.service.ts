import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";


const insertIntoDB = async(data: Book):Promise<Book> =>{
    const result = await prisma.book.create({
        data,
        include:{
            category: true
        } 
    })
    return result;
}
 
const getAllFromDB = async():Promise<Book[]> =>{
    const result = await prisma.book.findMany({
        include:{
            category: true
        } 
    })

    return result;
}

const getByIdFromDB = async (id: string): Promise<Book | null> => {
    const result = await prisma.book.findUnique({
        where: {
            id
        },
        include:{
            category: true
        } 
    });
    return result;
};

const updateOneInDB = async (
    id: string,
    payload: Partial<Book>
): Promise<Book> => {
    const result = await prisma.book.update({
        where: {
            id
        },
        data: payload,
    });
    return result;
};

const deleteByIdFromDB = async (id: string): Promise<Book> => {
    const result = await prisma.book.delete({
        where: {
            id
        },
    });
    return result;
};

const getCategoryBooksByIdFromDB = async (id: string, options: IPaginationOptions): Promise<IGenericResponse<Book[]>> => {
    const { limit, page } = paginationHelpers.calculatePagination(options);
    const result = await prisma.book.findMany({
        where: {
            categoryId: id
        },
        include:{
            category: true
        } 
    });
    const total = await prisma.book.count({
        where: {categoryId: id}
    });
    const totalPage = (total+limit)/limit-(total/limit);
    const size = limit;
    return {
        meta: {
            page,
            size,
            total,
            totalPage
        },
        data: result
    };
};


export const BookService ={
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB,
    getCategoryBooksByIdFromDB
}