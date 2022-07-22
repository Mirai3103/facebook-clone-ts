import { Sequelize } from 'sequelize-typescript'
import User, { Genders, UserDetail, UserRoles } from './user.model'


// const sequelize = new Sequelize({
//     database: 'facebook',
//     dialect: 'mysql',
//     username: 'root',
//     password: '',
//     host: 'localhost',
//     port: 3306,

//     models: [User, UserDetail],
// });


// (async () => {
//     await sequelize.sync({ force: true })
//     console.log('Database synced')
//     const user = new User({
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'fdsfdsf',
//         pwdHash: 'fds',
//         gender: Genders.FEMALE,
//         birthday: new Date()
//     })
//     user.save();
// }
// )();


function a({ id, email }: { id?: string, email?: string }) {

    const b = {
        id, email
    }
    console.log(b);
}
a({ id: '1' });