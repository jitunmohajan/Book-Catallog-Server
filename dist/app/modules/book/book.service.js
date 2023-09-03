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
exports.BookService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const book_constant_1 = require("./book.constant");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true
        }
    });
    return result;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit: size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search, minPrice, maxPrice } = filters;
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: book_constant_1.bookSearchableFields.map((field) => ({
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
            price: {
                gte: min
            }
        });
    }
    if (maxPrice) {
        const max = parseFloat(maxPrice);
        andConditions.push({
            price: {
                lte: max
            }
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                price: 'desc'
            }
    });
    const total = result.length;
    const totalPage = (total + size) / size - (total / size);
    return {
        meta: {
            page,
            size,
            total,
            totalPage
        },
        data: result
    };
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id
        },
        include: {
            category: true
        }
    });
    return result;
});
const updateOneInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id
        },
        data: payload,
    });
    return result;
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id
        },
    });
    return result;
});
const getCategoryBooksByIdFromDB = (id, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId: id
        },
        include: {
            category: true
        }
    });
    const total = yield prisma_1.default.book.count({
        where: { categoryId: id }
    });
    const totalPage = (total + limit) / limit - (total / limit);
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
});
exports.BookService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB,
    getCategoryBooksByIdFromDB
};
