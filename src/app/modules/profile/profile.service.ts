import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { IUser } from "./profile.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import prisma from "../../../shared/prisma";

const getProfile = async (token:string | undefined): Promise<IUser | null> => {
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

export const ProfileService = {
    getProfile
}