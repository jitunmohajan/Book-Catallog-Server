import { Book, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IBookFilterRequest } from "./book.interface";
import { bookSearchableFields } from "./book.constant";


const insertIntoDB = async(data: Book):Promise<Book> =>{
    const result = await prisma.book.create({
        data,
        include:{
            category: true
        } 
    })
    return result;
}
 
const getAllFromDB = async(filters: IBookFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Book[]>> =>{
    const { limit:size, page, skip } = paginationHelpers.calculatePagination(options);
    const { search, minPrice, maxPrice  } = filters;
    
    const andConditions = [];

    if (search) {
        andConditions.push({
            OR: bookSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive'
                }
            }))
        });
    }

    if (minPrice) {
        const min = parseFloat(minPrice);
        andConditions.push({
            price:{
                gte: min
            }
        });   
    }

    if (maxPrice) {
         const max = parseFloat(maxPrice);
        andConditions.push({
            price:{
                lte: max
            }
        });   
    }

    const whereConditions: Prisma.BookWhereInput = andConditions.length>0 ? { AND: andConditions } : {};

    


    const result = await prisma.book.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                    price: 'desc'
                }
    });


    const total = result.length;
    const totalPage = (total+size)/size-(total/size);
    return {
        meta: {
            page,
            size,
            total,
            totalPage
        },
        data: result
    };
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