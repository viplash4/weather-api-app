import { CustomError } from '../middlewares/ErrorHandler';
import User from '../models/User';
import { userRequest } from '../types/userData';
import bcrypt from 'bcrypt';

export const isEmailValid = (email) => {
    const regEx = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regEx.test(email);
};

export const checkEmailExistance = async (email) => {
    const foundedUser = await User.findOne({ where: { email } });
    return foundedUser !== null && foundedUser !== undefined;
};

export const isUserRequest = (req): req is userRequest => {
    return (
        typeof req?.request?.name === 'string' &&
        typeof req?.request?.password === 'string' &&
        typeof req?.request?.email === 'string' &&
        typeof req?.body?.birthDate === 'string'
        //todo: birthDate
    );
};
