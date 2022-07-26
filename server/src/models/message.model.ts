import './user.model';
import mongoose from 'mongoose';
import { IUserDocument } from './user.model';
export interface IMessage {
    message: string;
    fromUser: mongoose.PopulatedDoc<IUserDocument>;
    toUser: mongoose.PopulatedDoc<IUserDocument>;
}
interface IMessageDocument extends Document, IMessage {
}
const schema = new mongoose.Schema({
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
    message: {
        type: String,
        required: true,
    }
});
const Message = mongoose.model<IMessageDocument>('Message', schema);
export default Message;
