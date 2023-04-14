import { CustomError } from '../middlewares/ErrorHandler';
import User from '../models/User';
import { userData, userRequest } from '../types/userData';
import bcrypt from 'bcrypt';

export const isEmailValid = (email) => {
    const regEx = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regEx.test(email);
};

export const checkEmailExistance = async (email) => {
    const foundedUser = await User.findOne({ where: { email } });
    return foundedUser !== null && foundedUser !== undefined;
};

export const isUserRequest = (req): req is userData => {
    return (
        typeof req?.name === 'string' &&
        typeof req?.password === 'string' &&
        typeof req?.email === 'string' &&
        typeof req?.birthDate === 'string'
        //todo: birthDate
    );
};
