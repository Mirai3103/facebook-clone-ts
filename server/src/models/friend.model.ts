import "./user.model";
import mongoose from "mongoose";
import { IUserDocument } from './user.model';
export interface IFriend {
    fromUser: mongoose.PopulatedDoc<IUserDocument>;
    toUser: mongoose.PopulatedDoc<IUserDocument>;
    status: string;
}
interface IFriendDocument extends Document, IFriend {
}

const friendSchema = new mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true,
    },
    toUser: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true,
    },
    status: {
        type: mongoose.Schema.Types.String,
        enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
        required: true,
        default: 'PENDING',
    }
}
    , { timestamps: true });

const Friend = mongoose.model<IFriendDocument>('Friend', friendSchema);
export default Friend;

