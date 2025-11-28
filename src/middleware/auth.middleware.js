import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { config } from 'dotenv';
config();


const secret_key = process.env.JWT_SECRET_KEY;

export const authentication = (req, res, next) => {
    if (!req.headers['authorization']) return res.sendStatus(401);
    console.log(req.headers['authorization']);
    const token = req.headers['authorization'].split(" ")[1];
    console.log(token)

    if (!token) return res.status(401).json({ message: 'Token perdido sin autorization' });
    jwt.verify(token, secret_key, (err) => {
        if (err) return res.sendStatus(403);
        next();
    });
}