import { Router } from 'express';
import { addToQueue } from '../controller/trivia.controller';

const triviaRouter = Router();

triviaRouter.get('/', async (req, res, next) => {
    try {
        await addToQueue(req, res);

        //res.send('Trivia questions processing started');
    } catch (err) {
        next(err);
    }
});

export default triviaRouter;
