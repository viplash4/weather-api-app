import { Model, DataTypes, Sequelize } from 'sequelize';
import { database } from '../config/database';

const User = database.define('User', {
    name: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
});

User.sync();
export default User;
