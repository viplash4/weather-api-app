import { Model, DataTypes } from 'sequelize';
import { database } from '../config/database';

export class User extends Model {
    public id!: number;
    public name!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        tableName: 'users',
        sequelize: database,
    }
);

User.sync();
