import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";


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


export const BookService ={
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB
}