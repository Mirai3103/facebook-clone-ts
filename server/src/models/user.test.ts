import mongoose from "mongoose";
import User from "./user.model";
import Post, { IPost } from "./post.model";




(async () => {
    mongoose.connect('mongodb://localhost:27017/test')
    const startTime = performance.now()
    const post = await Post.findOne().populate('user').exec();

    console.log(`Call to doSomething took ${performance.now() - startTime} milliseconds`)

    console.log(typeof post?._id);




})();
