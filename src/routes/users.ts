import { Router } from 'express';
import { authenticateUser, createUser } from '../controller/users.controller';
import { initDatabase } from '../config/database';

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

userRouter.get('/getusers', async (req, res, next) => {
    try {
        const users = (await initDatabase()).models.User.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
});
userRouter.delete('/dropusers', async (req, res, next) => {
    try {
        (await initDatabase()).models.User.destroy({ where: {} });
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
        res.json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
});
export default userRouter;
