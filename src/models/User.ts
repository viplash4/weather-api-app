import { DataTypes, Sequelize } from 'sequelize';

const defineUser = async (database: Sequelize) => {
    const User = database.define('User', {
        name: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        birthDate: {
            type: DataTypes.DATEONLY,
        },
    });

    await User.sync();
    return User;
};
export default defineUser;
