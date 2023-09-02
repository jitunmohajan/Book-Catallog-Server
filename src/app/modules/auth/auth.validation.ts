import { z } from 'zod';

const create = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required'
        }),
        email: z.string({
            required_error: 'Email is required'
        }),
        role: z.string({
            required_error: 'role id is required'
        }),
        contactNo: z.string({
            required_error: 'Min credit is required'
        }),
        address: z.string({
            required_error: 'address is required'
        }),
        profileImg: z.string({
            required_error: 'Profile Image is required'
        })
    })
});

export const AuthValidation = {
    create
};