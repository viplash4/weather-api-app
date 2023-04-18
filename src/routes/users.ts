import { Router } from 'express';
import User from '../models/User';
import {
    authenticateUser,
    createUser,
    generateToken,
} from '../controller/users.controller';
import authenticateToken from '../middlewares/TokenAuth';

const userRouter = Router();

userRouter.post('/setuser', async (req, res, next) => {
    try {
        console.log(req.body);
        const user = await createUser(req.body);
        res.json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

userRouter.get('/getusers', authenticateToken, async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
});
userRouter.delete('/dropusers', authenticateToken, async (req, res, next) => {
    try {
        await User.destroy({ where: {} });
        res.send('All users have been deleted.');
    } catch (error) {
        console.log(error);
        next(error);
    }
});
userRouter.post('/authuser', async (req, res, next) => {
    try {
        console.log(req.body);
        const user = await authenticateUser(req.body);
        const token = generateToken({ data: req.body.email });
        res.json(token);
    } catch (error) {
        console.log(error);
        next(error);
    }
});
export default userRouter;
