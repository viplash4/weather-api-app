import { CustomError } from '../middlewares/ErrorHandler';
import { Router } from 'express';
import User from '../models/User';
export const index = Router();
index.post('/users', async (req, res, next) => {
    try {
        console.log(req.body);
        const user = await User.create({
            name: req.body.name,
            password: req.body.password,
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
