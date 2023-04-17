import { initDatabase } from '../config/database';
import { CustomError } from '../middlewares/ErrorHandler';
import { userAuth } from '../types/userAuth';
import { userData } from '../types/userData';
import * as bcrypt from 'bcrypt';

export const isEmailValid = (email: string) => {
    const regEx = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regEx.test(email);
};

export const checkEmailExistance = async (email: string) => {
    const foundedUser = (await initDatabase()).models.User.findOne({
        where: { email },
    });
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
export const isUserAuth = (data): data is userAuth => {
    return (
        typeof data?.email === 'string' && typeof data?.password === 'string'
    );
};
export const createUser = async (data: userData) => {
    if (!isUserRequest(data)) {
        throw new CustomError(400, `Invalid request format`);
    }
    const { name, email, password, birthDate } = data;
    if (!isEmailValid(email)) {
        throw new CustomError(400, `Invalid email format`);
    }

    if (await checkEmailExistance(email)) {
        throw new CustomError(409, `Email already registered`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = (await initDatabase()).models.User.create({
        name,
        email,
        password: hashedPassword,
        birthDate,
    });

    return user;
};

export const authenticateUser = async (data: userAuth) => {
    if (!isUserAuth(data)) {
        throw new CustomError(400, `Invalid request format`);
    }
    const { email, password } = data;
    const user = (await initDatabase()).models.User.findOne({
        where: { email },
    });
    if (!isUserRequest(user)) {
        throw new CustomError(400, `Invalid request format`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new CustomError(401, `Invalid email or password`);
    }

    return user;
};
