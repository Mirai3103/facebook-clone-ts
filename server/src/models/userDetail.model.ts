import mongoose, { Document } from 'mongoose';

export interface IUserDetail {
    phoneNumber?: string;
    avatarUrl?: string;
    location?: string;
}

interface UserDetailDocument extends Document, IUserDetail {

}
export const userDetailSchema = new mongoose.Schema<UserDetailDocument>({
    phoneNumber: {
        type: String,
        default: '',
    },
    avatarUrl: {
        type: String,
        default: '',
    },
    location: {
        type: String,
        default: '',
    },
}

);

const UserDetail = mongoose.model<UserDetailDocument>('UserDetail', userDetailSchema);
export default UserDetail;

