import { CustomError } from '../middlewares/ErrorHandler';
import User from '../models/User';
import { userData } from '../types/userData';
import * as bcrypt from 'bcrypt';
export const isEmailValid = (email: string) => {
    const regEx = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regEx.test(email);
};

export const checkEmailExistance = async (email: string) => {
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
export const createUser = async (req: userData) => {
    if (!isUserRequest(req)) {
        throw new CustomError(400, `Invalid request format`);
    }
    const { name, email, password, birthDate } = req;
    if (!isEmailValid(email)) {
        throw new CustomError(400, `Invalid email format`);
    }

    if (await checkEmailExistance(email)) {
        throw new CustomError(409, `Email already registered`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        birthDate,
    });

    return user;
};
