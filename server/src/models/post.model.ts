import {
    Column, Model, PrimaryKey, Table,
    DataType, ForeignKey, HasOne, BelongsTo, BeforeCreate, AfterCreate
} from "sequelize-typescript";
import { Optional } from "sequelize/types";
import User from "./user.model";

interface IPost {
    id: number;
    content?: string;
    imageUrl?: string;
    likes: number;
    userId: string;
}

export type PostCreator = Optional<IPost, 'id'>

@Table({ timestamps: true })
class Post extends Model<IPost, PostCreator> {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
    })
    id!: number;
    @Column({
        type: DataType.TEXT,
    })
    content?: string;
    @Column({
        type: DataType.TEXT,
        defaultValue: '',
    })
    imageUrl?: string;
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    likes!: number;
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId!: string;
    @BelongsTo(() => User)
    user!: User;
}

export default Post;