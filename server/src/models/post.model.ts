import './user.model';
import mongoose from 'mongoose';
import { PopulatedDoc, Document, Schema } from 'mongoose';
import { v4 } from 'uuid';
import { IUserDocument } from './user.model';
export interface IPost {
    content: string;
    user: PopulatedDoc<IUserDocument>;
    likes: number;
    imageUrl: string;

}
interface IPostDocument extends Document, IPost {
    _id: string
}
const schema = new mongoose.Schema({
    _id: {
        type: String,
        default: function () {
            return v4();
        }
    },
    content: {
        type: String,
        default: '',
    },
    user: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    imageUrl: {
        type: String,
        default: '',
    }

}, { timestamps: true });

const Post = mongoose.model<IPostDocument>('Post', schema);
export default Post;