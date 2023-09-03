import { Order } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";


const insertIntoDB = async(token:string | undefined, data: any):Promise<Order> =>{

    let verifiedUser = null;
    if(!token){
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
    }
    try {
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
    } catch (err) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { id } = verifiedUser;

    data.userId=id;

    const result = await prisma.order.create({
        data
    })
    return result;
}
 
const getAllFromDB = async(token:string | undefined):Promise<Order[]> =>{

    let verifiedUser = null;
    if(!token){
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
    }
    try {
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
    } catch (err) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { id, role } = verifiedUser;

    if(role == "admin"){
        const result = await prisma.order.findMany({})
        return result;
    }else{
        const result = await prisma.order.findMany({
            where:{
                userId:id
            }
        })
        console.log(result);
        return result;
    }
}

const getByIdFromDB = async (token:string | undefined,id: string): Promise<Order | null> => {

    let verifiedUser = null;
    if(!token){
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
    }
    try {
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
    } catch (err) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { id:userId, role } = verifiedUser;

    const result = await prisma.order.findUnique({
        where: {
            id
        }
    });
    if((role == 'customer' &&  userId == result?.userId) || role == 'admin') {
        return result;
    }else{
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Customer');
    }
};

export const OrderService ={
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
}