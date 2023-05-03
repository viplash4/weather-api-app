import * as amqp from 'amqplib';
import {
    fetchTriviaQuestions,
    sendTriviaQuestionsToRabbitMQ,
} from '../controller/trivia.controller';
import { CustomError } from '../middlewares/ErrorHandler';

let channel;

export const connectToRabbit = async () => {
    while (!channel) {
        try {
            const connection = await amqp.connect('amqp://localhost:5672');
            channel = await connection.createChannel();
        } catch {
            await wait(500);
        }
    }
};
export const addToQueue = async (request, response) => {
    try {
        const questionNumber = Number(request.query.number);
        if (isNaN(questionNumber)) {
            throw new CustomError(401, 'count must be number');
        }
        const triviaQuestions = await fetchTriviaQuestions(questionNumber);
        if (!channel) await connectToRabbit();
        await sendTriviaQuestionsToRabbitMQ(channel, triviaQuestions);
        console.log(`Sent to RabbitMQ: ${JSON.stringify(triviaQuestions)}`);
        console.log('Trivia questions sent to RabbitMQ');
        response.send('Trivia questions processing started');
    } catch (error) {
        throw new CustomError(500, error);
    }
};
function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
