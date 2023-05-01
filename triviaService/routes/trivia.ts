import { Router } from 'express';
import { fetchTriviaQuestions } from '../controller/trivia.controller';
const triviaRouter = Router();

triviaRouter.get('/', async (req, res, next) => {
    try {
        await fetchTriviaQuestions();
        res.send('Trivia questions processing started');
    } catch (err) {
        next(err);
    }
});

export default triviaRouter;
