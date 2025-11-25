import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { config } from 'dotenv';
config();


const secret_key = process.env.JWT_SECRET_KEY;
console.log(secret_key)

export const authentication = (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1];
    console.log(token)

    if (!token) return res.sendStatus(401);

    jwt.verify(token, secret_key, (err) => {
        if (err) return res.sendStatus(403);
        next();
    });
}