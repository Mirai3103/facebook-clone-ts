import friendService from "./friend.service";
import mongoose from "mongoose";

(async () => {
    await mongoose.connect("mongodb://localhost:27017/fb");

    const us = await friendService.getFriendRequest("03ed2691-fac1-4a56-92a1-6b46afb3a5b6");
    console.log(us)
}
)()