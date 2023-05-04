import { connectToRabbit } from '../config/rabbitmq';
import { CustomError } from '../middlewares/ErrorHandler';

export const sendTriviaQuestionsToRabbitMQ = async (question) => {
    try {
        const queue = 'trivia-questions';
        const channel = await connectToRabbit();

        await channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(question)));
    } catch (err) {
        console.error(err);
    }
};

export const addToQueue = async (request, response) => {
    try {
        const questionNumber = Number(request.query.number);
        if (isNaN(questionNumber)) {
            throw new CustomError(401, 'Count must be a number');
        }

        await sendTriviaQuestionsToRabbitMQ(questionNumber);

        console.log(`Sent to RabbitMQ: ${questionNumber}`);
        response.send('Trivia questions processing started');
    } catch (error) {
        throw new CustomError(500, error);
    }
};
