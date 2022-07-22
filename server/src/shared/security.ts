import { IUser, UserRoles } from '@models/user.model';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { jwtOptions } from './configs';
const saltRounds = 10;

export function hashPassword(password: string): string {
    return hashSync(password, genSaltSync(saltRounds));
}

export function comparePassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
}

interface JWTDecoder {
    id: string
    email: string
    role: UserRoles
}
export function signUser(user: IUser): string {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    return sign(payload, jwtOptions.secretKey, jwtOptions.signOptions);
}



export function verifyUser(token: string): JWTDecoder | null {
    try {
        const decoded = verify(token, jwtOptions.secretKey);
        return decoded as JWTDecoder;
    } catch (e) {

        return null;
    }
}