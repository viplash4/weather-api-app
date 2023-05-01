import { Router } from 'express';
import { fetchTriviaQuestionsStream } from '../controller/trivia.controller';
const triviaRouter = Router();

triviaRouter.get('/', async (req, res, next) => {
    try {
        const triviaStream = await fetchTriviaQuestionsStream();

        res.json(triviaStream);
    } catch (err) {
        next(err);
    }
});

export default triviaRouter;
