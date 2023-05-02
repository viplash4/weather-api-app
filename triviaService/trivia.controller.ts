import * as JSONStream from 'JSONStream';
import fetch from 'node-fetch';

import * as amqp from 'amqplib';
import { Transform } from 'stream';

export const fetchTriviaQuestions = async (questionNumber) => {
    const API_URL = `https://opentdb.com/api.php?amount=${questionNumber}`;

    const questions = [];

    const readableStream = (await fetch(API_URL)).body.pipe(
        JSONStream.parse('results.*')
    );

    const transformStream = new Transform({
        objectMode: true,
        transform: (chunk, encoding, callback) => {
            questions.push(chunk);
            callback(null, chunk);
        },
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

export const sendTriviaQuestionsToRabbitMQ = async (
    rabbitMqConnection,
    questions
) => {
    try {
        const queue = 'trivia-questions';
        await rabbitMqConnection.channel.assertQueue(queue);

        for (const question of questions) {
            rabbitMqConnection.channel.sendToQueue(
                queue,
                Buffer.from(JSON.stringify(question))
            );
        }

        console.log('Trivia questions sent to RabbitMQ');
    } catch (err) {
        console.error(err);
    }
};
