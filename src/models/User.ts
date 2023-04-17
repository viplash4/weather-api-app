import { DataTypes } from 'sequelize';
import { database } from '../config/database';

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

User.sync();
export default User;
