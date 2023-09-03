"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const insertIntoDB = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedUser = null;
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    try {
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { id } = verifiedUser;
    data.userId = id;
    const result = yield prisma_1.default.order.create({
        data
    });
    return result;
});
const getAllFromDB = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedUser = null;
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    try {
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { id, role } = verifiedUser;
    if (role == "admin") {
        const result = yield prisma_1.default.order.findMany({});
        return result;
    }
    else {
        const result = yield prisma_1.default.order.findMany({
            where: {
                userId: id
            }
        });
        console.log(result);
        return result;
    }
});
const getByIdFromDB = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedUser = null;
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    try {
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { id: userId, role } = verifiedUser;
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id
        }
    });
    if ((role == 'customer' && userId == (result === null || result === void 0 ? void 0 : result.userId)) || role == 'admin') {
        return result;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Customer');
    }
});
exports.OrderService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
};
