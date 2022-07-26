import User, { IUser } from "@models/user.model";
import { IUserDetail } from "@models/userDetail.model";
import { comparePassword, signUser, verifyUser } from "@shared/security";
import { upload } from './googledriver'

async function register(user: IUser, file: Express.Multer.File | undefined) {
    const newUser = await User.create(user);


    if (file) {
        const imageUrl = await upload(file.originalname, file.buffer);
        if (imageUrl) {
            if (newUser.userDetail) {
                await newUser.updateOne({
                    userDetail: {
                        avatarUrl: "https://drive.google.com/uc?export=view&id=" + imageUrl,
                    }
                }).exec();


            }
        }

    }
    return newUser;
}

interface LoginPayload {
    id?: string
    email?: string;
    password: string;
}

async function login(loginPayload: LoginPayload) {
    let user: IUser & { _id: string } | null;
    if (loginPayload.email) {
        user = await User.findOne({ email: loginPayload.email }).exec();
    } else {
        user = await User.findOne({
            id: loginPayload.id,
        }).exec();
    }
    if (!user) {
        throw new Error("User not found");
    }

    if (!comparePassword(loginPayload.password, user.pwdHash)) {
        throw new Error("Password is incorrect");
    }
    return { token: signUser(user), user };
}

async function identify(token: string) {
    const userJWT = verifyUser(token);
    if (!userJWT) {
        throw new Error("Invalid token");
    }
    const user = await User.findOne({ _id: userJWT.id })
        .select('-pwdHash -birthday').exec();
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}

export default {
    register,
    login,
    identify
}