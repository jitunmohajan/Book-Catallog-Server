"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required'
        }),
        email: zod_1.z.string({
            required_error: 'Email is required'
        }),
        password: zod_1.z.string({
            required_error: 'Email is required'
        }),
        role: zod_1.z.string({
            required_error: 'role id is required'
        }),
        contactNo: zod_1.z.string({
            required_error: 'Min credit is required'
        }),
        address: zod_1.z.string({
            required_error: 'address is required'
        }),
        profileImg: zod_1.z.string({
            required_error: 'Profile Image is required'
        })
    })
});
const signin = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required'
        }),
        password: zod_1.z.string({
            required_error: 'Email is required'
        })
    })
});
exports.AuthValidation = {
    create,
    signin
};
