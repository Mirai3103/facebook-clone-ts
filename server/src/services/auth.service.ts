import User, { IUser, UserCreator, UserDetail } from "@models/user.model";
import { comparePassword, signUser, verifyUser } from "@shared/security";
import userService from "./user.service";
import { upload } from "./fileupload";

async function register(
  user: UserCreator,
  file: Express.Multer.File | undefined
): Promise<IUser> {
  const newUser = await User.create(user);

  if (file) {
    const imageUrl = await upload(file.originalname, file.buffer);
    if (imageUrl) {
      newUser.userDetail.avatarURL = imageUrl;
      await newUser.userDetail.save();
    }
  }
  newUser.save();
  return newUser.toJSON();
}

interface LoginPayload {
  id?: string;
  email?: string;
  password: string;
}

async function login(loginPayload: LoginPayload) {
  let user: User | null;

  if (!loginPayload.email) {
    user = await User.findOne({ where: { email: loginPayload.email } });
  } else {
    user = await User.findOne({
      where: { email: loginPayload.email },
      include: [UserDetail],
    });
  }
  if (!user) {
    throw new Error("User not found");
  }
  if (!comparePassword(loginPayload.password, user.pwdHash)) {
    throw new Error("Password is incorrect");
  }
  return { token: signUser(user.toJSON()), user: user.toJSON() };
}

async function identify(token: string) {
  const userJWT = verifyUser(token);
  if (!userJWT) {
    throw new Error("Invalid token");
  }
  const user = await User.findOne({
    where: { id: userJWT.id },
    include: [UserDetail],
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export default {
  register,
  login,
  identify,
};
