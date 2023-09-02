import bcrypt from 'bcrypt';
import { User } from "@prisma/client";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import { ILoginUser, ILoginUserResponse, IUser } from "./auth.interface";

const createUser = async (data: User):Promise<IUser>=>{
    data.password = await bcrypt.hash(
        data.password,
        Number(config.bycrypt_salt_rounds)
    );
    const result = await prisma.user.create({
        data,  
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
};

const signin = async (payload:ILoginUser):Promise<ILoginUserResponse>=>{
    const { email, password } = payload;
    const isUserExist = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(!isUserExist){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email or Password is incorrect');
    }

    // Assuming you have a hashed password stored in the database
    const hashedPasswordFromDB = isUserExist.password;

    // Use bcrypt to compare the provided password with the hashed password from the database
    const isPasswordMatched = await bcrypt.compare(password, hashedPasswordFromDB);

    if (!isPasswordMatched) {
        // Handle the case where the password is incorrect
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    }


    const { email: userEmail, role } = isUserExist;
    const token = jwtHelpers.createToken(
        { userEmail, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.createToken(
        { email, role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    );

    return {
        token,
        refreshToken,
    };

};

export const AuthService ={
    createUser,
    signin
}