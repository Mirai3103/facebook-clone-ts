import {
  Column,
  Model,
  PrimaryKey,
  Table,
  DataType,
  ForeignKey,
  HasOne,
  BelongsTo,
  BeforeCreate,
  AfterCreate,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { Optional } from "sequelize/types";
import { hashPassword } from "@shared/security";
import Post from "./post.model";

export enum UserRoles {
  USER,
  ADMIN,
}
export enum Genders {
  MALE,
  FEMALE,
  OTHER,
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pwdHash: string;
  role: UserRoles;
  gender: Genders;
  birthday: Date;
}

export interface IdentifyUser {
  id?: string;
  email?: string;
}

export type UserCreator = Optional<IUser, "id" | "role">;

@Table({ timestamps: true })
class User extends Model<IUser, UserCreator> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  })
  id!: string;
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  firstName!: string;
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  lastName!: string;
  @Column({
    type: DataType.STRING(60),
    allowNull: false,
    unique: true,
  })
  email!: string;
  @Column({
    type: DataType.CHAR(150),
    allowNull: false,
    unique: true,
  })
  pwdHash!: string;
  @Column({
    type: DataType.ENUM("USER", "ADMIN"),
    allowNull: false,
    defaultValue: UserRoles[UserRoles.USER],
  })
  role?: UserRoles;
  @Column({
    type: DataType.ENUM("MALE", "FEMALE", "OTHER"),
    allowNull: false,
  })
  gender!: Genders;
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  birthday!: Date;
  @HasOne(() => UserDetail)
  userDetail!: UserDetail;
  @BeforeCreate
  static hashPassword(instance: User) {
    instance.pwdHash = hashPassword(instance.pwdHash);
  }
  @AfterCreate
  static createUserDetail(instance: User) {
    instance.userDetail = new UserDetail({ userId: instance.id });
    instance.userDetail.email = instance.email;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (instance.gender === Genders[Genders.MALE]) {
      instance.userDetail.avatarURL =
        "https://drive.google.com/uc?export=view&id=1S7Xctscoqq0SylFWpW4EGRRrYCn2PSjO";
    } else {
      instance.userDetail.avatarURL =
        "https://drive.google.com/uc?export=view&id=1e73g_Rglt4AtjtGwnlL6fG8rl0Qn83zy";
    }
    instance.userDetail.save();
  }
  @HasMany(() => Post)
  posts!: Post[];
  @BelongsToMany(() => User, () => FriendList, "userId1", "userId2")
  friends1!: User[];
}

interface IUserDetail {
  userId: string;
  email?: string;
  phoneNumber?: string;
  avatarURL?: string;
  location?: string;
}

@Table({
  updatedAt: true,
  createdAt: false,
  deletedAt: false,
})
export class UserDetail extends Model<IUserDetail> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
  })
  userId!: string;
  @BelongsTo(() => User)
  user!: User;
  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  email?: string;
  @Column({
    type: DataType.STRING(120),
    allowNull: true,
  })
  phoneNumber?: string;
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  avatarURL?: string;
  @Column({
    type: DataType.CHAR(3),
    allowNull: true,
    defaultValue: "vi",
  })
  location?: string;
}

export default User;

export interface IFriendList {
  id: number;
  userId1: string;
  userId2: string;
}
export type FriendListCreator = Optional<IFriendList, "id">;

@Table({ timestamps: true })
export class FriendList extends Model<IFriendList, FriendListCreator> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id!: string;
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId1!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId2!: string;
}

export interface IFriendRequest {
  id: number;
  fromUserId: string;
  toUserId: string;
}
export type FriendRequestCreator = Optional<IFriendRequest, "id">;

@Table({ timestamps: true })
export class FriendRequest extends Model<IFriendRequest, FriendRequestCreator> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: false,
  })
  fromUserId!: string;
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: false,
  })
  toUserId!: string;
}
