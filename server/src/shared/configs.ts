import { CorsOptions } from 'cors'
import { SignOptions } from 'jsonwebtoken';
import { CookieOptions } from 'express';
export const corsOptions: CorsOptions = Object.freeze({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type',
        'Authorization', 'Accept', 'Origin',
        'X-Requested-With', 'Content-Length', 'Accept-Encoding',
        'Accept-Language', 'Host', 'Referer', 'User-Agent', 'Cookie'],
    exposedHeaders: ['Content-Type',
        'Authorization', 'Accept', 'Origin',
        'X-Requested-With', 'Content-Length', 'Accept-Encoding',
        'Accept-Language', 'Host', 'Referer', 'User-Agent', 'Cookie']
});

const signOptions: SignOptions =
{
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXP || '1h',
}

export const jwtOptions = {
    secretKey: process.env.JWT_SECRET || 'kakanguloz',
    signOptions
}


const options: CookieOptions = {
    httpOnly: true,
    signed: true,
    secure: (process.env.SECURE_COOKIE === 'true'),
    maxAge: 216000 * 60,
    path: '/',
    sameSite: 'strict',
}



export const cookieProps = Object.freeze({
    keyAccess: process.env.KEY_SECRET || "access",
    secret: process.env.COOKIE_SECRET || 'kakanguloz',
    options
});
import multer from 'multer';
export const storage = multer.memoryStorage();
export const upload = multer({ dest: 'uploads/', storage })
