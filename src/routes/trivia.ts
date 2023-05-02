import { Router } from 'express';
import {
    fetchTriviaQuestions,
    sendTriviaQuestionsToRabbitMQ,
} from '../../triviaService/trivia.controller';
const triviaRouter = Router();

triviaRouter.get('/', async (req, res, next) => {
    try {
        const questions = await fetchTriviaQuestions();
        console.log(questions);
        await sendTriviaQuestionsToRabbitMQ(questions);
        res.send('Trivia questions processing started');
    } catch (err) {
        next(err);
    }
});

export default triviaRouter;
