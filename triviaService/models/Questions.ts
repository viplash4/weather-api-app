import { DataTypes } from 'sequelize';
import { database } from '../config/database';

const Questions = database.define('Questions', {
    category: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING,
    },
    difficulty: {
        type: DataTypes.STRING,
    },
    question: {
        type: DataTypes.STRING,
    },
    correct_answer: {
        type: DataTypes.STRING,
    },
    incorrect_answers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
});

Questions.sync();
export default Questions;
