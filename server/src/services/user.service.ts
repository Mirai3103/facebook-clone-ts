import { Op } from 'sequelize';
import User, { IdentifyUser, IUser, UserCreator, UserDetail } from '../models/user.model';
import { BadRequestError, NotFoundError } from '../shared/errors';



async function getAll(): Promise<User[]> {
    return await User.findAll();
}


async function addOne(user: UserCreator): Promise<IUser> {
    const oldUser = await User.findOne({
        where: {
            email: user.email
        }
    });
    if (oldUser) {
        throw new BadRequestError('User already exists');
    }
    const newUser = new User(user);
    await newUser.save();
    return newUser.toJSON();
}

async function findByPk(id: string): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) {
        throw new NotFoundError("User not found");
    }
    return user;
}

async function findByEmail(email: string) {
    const user = await User.findOne({
        where: {
            email
        }
    });
    if (!user) {
        throw new NotFoundError("User not found");
    }
    return user;
}

async function updateOne(identify: IdentifyUser, user: UserCreator): Promise<void> {
    await User.update({
        ...user,
    }, {
        where: { ...identify },
    });
}

function deleteOne(identify: IdentifyUser): void {
    User.destroy({
        where: { ...identify },
    });
}

async function findLikeName(name: string): Promise<User[]> {
    const user = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        include: [{
            model: UserDetail,
            attributes: ['avatarURL'],

        }],
        where: {
            [Op.or]: [
                { firstName: { [Op.like]: `%${name}%` } },
                { lastName: { [Op.like]: `%${name}%` } },
            ]
        }
    });
    return user;
}




// Export default
export default {
    findByPk,
    findByEmail,
    getAll,
    addOne,
    updateOne,
    delete: deleteOne,
    findLikeName,
} as const;
