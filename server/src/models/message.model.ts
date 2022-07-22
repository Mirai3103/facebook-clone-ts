import {
    Column, Model, PrimaryKey, Table,
    DataType
} from "sequelize-typescript";
import { Optional } from "sequelize/types";


interface IMessage {
    id: number;
    fromUserId: string;
    toUserId: string;
    message: string;
}

export type MessageCreator = Optional<IMessage, 'id'>

@Table({
    timestamps: true
})
export default class Message extends Model<IMessage, MessageCreator> {
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

    @Column({
        type: DataType.UUID,
        allowNull: false,
        unique: false,
    })
    toUserId!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        unique: false,
    })
    message!: string;
}