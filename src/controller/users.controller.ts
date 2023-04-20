import { CustomError } from '../middlewares/ErrorHandler';
import User from '../models/User';
import { loginUserDTO } from '../types/loginUserDTO';
import { createUserDTO } from '../types/createUserDTO';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import environment from '../config/environment';

export const isEmailValid = (email: string) => {
    const regEx = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regEx.test(email);
};

export const checkEmailExistance = async (email: string) => {
    const foundedUser = await User.findOne({ where: { email } });
    return foundedUser !== null && foundedUser !== undefined;
};

export const isCreateUserDTO = (data): data is createUserDTO => {
    return (
        typeof data?.name === 'string' &&
        typeof data?.password === 'string' &&
        typeof data?.email === 'string' &&
        typeof data?.birthDate === 'string'
    );
};
export const isLoginUserDTO = (data): data is loginUserDTO => {
    return (
        typeof data?.email === 'string' && typeof data?.password === 'string'
    );
};
export const createUser = async (data: createUserDTO) => {
    if (!isCreateUserDTO(data)) {
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

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        birthDate,
    });

    return user;
};
export const generateToken = (data) => {
    return jwt.sign(data, environment.secret_token, { expiresIn: '1800s' });
};
export const authenticateUser = async (data: loginUserDTO) => {
    if (!isLoginUserDTO(data)) {
        throw new CustomError(400, `Invalid request format`);
    }
    const { email, password } = data;
    const user = await User.findOne({ where: { email } });
    if (!isCreateUserDTO(user)) {
        throw new CustomError(400, `Invalid request format`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new CustomError(401, `Invalid email or password`);
    }

    return user;
};
