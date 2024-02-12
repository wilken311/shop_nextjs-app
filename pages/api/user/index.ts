import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import { ncOpts } from '@/api-lib/nc';
import { auths } from '@/api-lib/middlewares';
import { User } from "@/lib/user";


const handler = nc<NextApiRequest, NextApiResponse>(ncOpts);
handler.use(...auths);

interface ExtendedRequest {
    user: User;
}

handler.get<ExtendedRequest>(async (req, res) => {
    if (!req.user) return res.json({ user: null });
    return res.json({ user: req.user });
});


export default handler;