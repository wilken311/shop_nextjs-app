import { NextApiRequest, NextApiResponse } from "next";
import { insertUser, findUserByEmail } from "@/api-lib/db";
import { User } from "@/lib/user";
import validator from 'validator';
import { capitalizeFirstLetter } from "@/lib/capitalize";
import nc from 'next-connect';
import { ncOpts } from '@/api-lib/nc';
import { auths, validateBody } from '@/api-lib/middlewares';
import { ValidateProps } from "@/api-lib/constants";

interface ExtendedRequest {
    logIn: any
}

const handler = nc<NextApiRequest, NextApiResponse>(ncOpts);

handler
    .use(...auths)
    .post<ExtendedRequest>(
        validateBody({
            type: 'object',
            properties: {
                email: ValidateProps.user.email,
                password: ValidateProps.user.password,
                name: ValidateProps.user.name,
                createdAt: ValidateProps.user.createdAt,
                updatedAt: ValidateProps.user.updatedAt
            },
            required: ['email', 'password', 'name', 'createdAt', 'updatedAt'],
            additionalProperties: false
        }),
        async (req, res) => {
            let userData: User = req.body
            const email: any = validator.normalizeEmail(userData.email);
            const name = capitalizeFirstLetter(userData.name);
            let userUpdatedData: any = { ...userData, name, email }

            if (!validator.isEmail(userData.email)) {
                return res.status(400).json({
                    message: 'Email is invalid!',
                    success: false
                })

            }
            if (await findUserByEmail(email)) {
                return res.status(403).json({
                    message: 'Email has already been used.',
                    success: false
                })
            }

            const insertedUserResponse = await insertUser(userUpdatedData);

            req.logIn(insertedUserResponse, (err: any) => {
                if (err) throw err;
                res.status(201).json({
                    data: insertedUserResponse,
                    message: 'User is successfully created!',
                    success: true
                });
            });

        })

export default handler;