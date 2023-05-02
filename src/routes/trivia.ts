import { Router } from 'express';
import {
    fetchTriviaQuestions,
    sendTriviaQuestionsToRabbitMQ,
} from '../../triviaService/trivia.controller';
import { CustomError } from '../middlewares/ErrorHandler';
import { connectToRabbitMQ } from '../rabbitmq';
const triviaRouter = Router();

triviaRouter.get('/', async (req, res, next) => {
    try {
        const questionNumber = Number(req.query.number);
        if (isNaN(questionNumber)) {
            throw new CustomError(401, 'count must be number');
        }
        const questions = await fetchTriviaQuestions(questionNumber);
        console.log(questions);
        const rabbitMqConnection = await connectToRabbitMQ();
        await sendTriviaQuestionsToRabbitMQ(rabbitMqConnection, questions);
        res.send('Trivia questions processing started');
    } catch (err) {
        next(err);
    }
});

export default triviaRouter;
