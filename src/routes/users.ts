import { CustomError } from '../middlewares/ErrorHandler';
import { Router } from 'express';
import User from '../models/User';
import {
    checkEmailExistance,
    isEmailValid,
} from '../controller/users.controller';
import * as bcrypt from 'bcrypt';
export const index = Router();

index.post('/setuser', async (req, res, next) => {
    try {
        console.log(req.body);
        //typeguard
        const { name, email, password, birthDate } = req.body;
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

        res.json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

index.get('/getusers', async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
});
index.delete('/dropusers', async (req, res, next) => {
    try {
        await User.destroy({ where: {} });
        res.send('All users have been deleted.');
    } catch (error) {
        console.log(error);
        next(error);
    }
});
