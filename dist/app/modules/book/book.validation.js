"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Name is required'
        }),
        author: zod_1.z.string({
            required_error: 'Name is required'
        }),
        genre: zod_1.z.string({
            required_error: 'Name is required'
        }),
        price: zod_1.z.number({
            required_error: 'Name is required'
        }),
        publicationDate: zod_1.z.string({
            required_error: 'Name is required'
        }),
        categoryId: zod_1.z.string({
            required_error: 'Name is required'
        }),
    })
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        publicationDate: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
    })
});
exports.BookValidation = {
    create,
    update
};
