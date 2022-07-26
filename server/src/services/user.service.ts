import { Op } from 'sequelize';
import User, { IUserDocument, IUser } from '../models/user.model';
import { BadRequestError, NotFoundError } from '../shared/errors';



async function getAll() {
    return await User.find().exec();
}


async function addOne(user: IUser) {

    const oldUser = await User.findOne({
        email: user.email
    }).exec();
    if (oldUser) {
        throw new BadRequestError('User already exists');
    }
    const newUser = new User(user);
    await newUser.save();
    return newUser.toJSON();
}

async function findByPk(id: string) {
    const user = await User.findById(id).exec();
    if (!user) {
        throw new NotFoundError("User not found");
    }
    return user;
}

async function findByEmail(email: string) {
    const user = await User.findOne({ email }).exec();
    if (!user) {
        throw new NotFoundError("User not found");
    }
    return user;
}

// async function updateOne(identify: IdentifyUser, user: UserCreator): Promise<void> {
//     await User.update({
//         ...user,
//     }, {
//         where: { ...identify },
//     });
// }

// function deleteOne(identify: IdentifyUser): void {
//     User.destroy({
//         where: { ...identify },
//     });
// }

async function findLikeName(name: string) {
    const user = await User.find({
        $or: [
            { firstName: { $regex: '.*' + name + '.*' } },
            { lastName: { $regex: '.*' + name + '.*' } },
        ]
    }).select('firstName lastName userDetail').exec();
    return user;
}




// Export default
export default {
    findByPk,
    findByEmail,
    getAll,
    addOne,

    findLikeName,
} as const;
//    updateOne,
// delete: deleteOne,