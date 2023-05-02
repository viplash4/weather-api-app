import * as JSONStream from 'JSONStream';
import fetch from 'node-fetch';
import * as through2 from 'through2';
import * as amqp from 'amqplib';

export const fetchTriviaQuestions = async () => {
    const API_URL = 'https://opentdb.com/api.php?amount=10';

    const questions = [];

    const readableStream = (await fetch(API_URL)).body.pipe(
        JSONStream.parse('results.*')
    );

    const transformStream = through2.obj((question, _, callback) => {
        questions.push(question);
        callback(null, question);
    });

    return new Promise((resolve, reject) => {
        readableStream
            .pipe(transformStream)
            .on('finish', () => {
                resolve(questions);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
};

export const sendTriviaQuestionsToRabbitMQ = async (questions) => {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        const queue = 'trivia-questions';
        await channel.assertQueue(queue);

        for (const question of questions) {
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(question)));
        }

        console.log('Trivia questions sent to RabbitMQ');
    } catch (err) {
        console.error(err);
    }
};
