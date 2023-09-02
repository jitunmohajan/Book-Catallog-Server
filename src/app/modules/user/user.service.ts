import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IUser } from "./user.interface";

const getAllFromDB = async():Promise<IUser[]> =>{
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    })

    return result;
}

const getByIdFromDB = async (id: string): Promise<IUser | null> => {
    const result = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
        
    });
    return result;
};

const updateOneInDB = async (
    id: string,
    payload: Partial<User>
): Promise<IUser> => {
    const result = await prisma.user.update({
        where: {
            id
        },
        data: payload,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return result;
};

const deleteByIdFromDB = async (id: string): Promise<IUser> => {
    const result = await prisma.user.delete({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return result;
};



export const UserService ={
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB,
}