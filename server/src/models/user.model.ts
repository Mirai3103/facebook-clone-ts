import mongoose, { PopulatedDoc, Document, Schema } from 'mongoose';
import './userDetail.model';
import { v4 } from 'uuid';
import { hashPassword } from '@shared/security';
import UserDetail, { IUserDetail, userDetailSchema } from './userDetail.model';


export enum UserRoles {
    USER = 0,
    ADMIN = 1,
}
export enum Genders {
    MALE = 0,
    FEMALE = 1,
    OTHER = 2
}

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    pwdHash: string;
    userDetail?: PopulatedDoc<IUserDetail>;
    role?: UserRoles;
    gender: Genders;
    birthday: Date;
}

export interface IUserDocument extends IUser, Document {
    _id: string;
    userDetail: PopulatedDoc<IUserDetail>;
}


const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: function () {
            return v4();
        }
    },
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 10,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 10,
    },
    email: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 40,
        unique: true,
    }
    ,
    pwdHash: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: false,
        enum: [0, 1],
        default: 0,
    },
    gender: {
        type: Number,
        required: true,
        enum: [0,
            1,
            2]
    }
    ,
    birthday: {
        type: Date,
        required: true,
    },
    userDetail: userDetailSchema

}, { timestamps: true });


userSchema.pre('save', function (next) {
    this.userDetail = new UserDetail({
        phoneNumber: '',
        avatarUrl: '',
        location: '',
    });
    if (this.isModified('pwdHash')) {
        this.pwdHash = hashPassword(this.pwdHash);
        if (this.gender === Genders.MALE) {
            this.userDetail.avatarUrl =
                'https://drive.google.com/uc?export=view&id=1S7Xctscoqq0SylFWpW4EGRRrYCn2PSjO'
        } else {
            this.userDetail.avatarUrl =
                'https://drive.google.com/uc?export=view&id=1e73g_Rglt4AtjtGwnlL6fG8rl0Qn83zy'
        }
    }

    next();
});

const User = mongoose.model<IUserDocument>("User", userSchema);

export default User;