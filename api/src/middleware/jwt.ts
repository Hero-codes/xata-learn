import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).send("You are not authenticated!");

    jwt.verify(token, String(process.env.JWT_KEY), async (err: any, payload: any) => {
        if (err) return res.status(403).send("Token is not valid");
        // @ts-ignore
        req.userId = payload.id;
        next();
    });
};