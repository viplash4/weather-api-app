import { Sequelize } from 'sequelize';
import environment from './environment';
export const database = new Sequelize({
    dialect: 'postgres',
    ...environment.database,
});
