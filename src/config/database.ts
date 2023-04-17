import { Sequelize } from 'sequelize';
import environment from './environment';
import defineUser from '../models/User';

export const initDatabase = async () => {
    const bd = new Sequelize({
        dialect: 'postgres',
        ...environment.database,
    });

    await defineUser(bd);
    return bd;
};
