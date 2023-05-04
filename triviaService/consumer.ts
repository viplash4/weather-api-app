import * as amqp from 'amqplib';
const queueName = 'trivia-questions';
import * as JSONStream from 'JSONStream';
import fetch from 'node-fetch';
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
export const connect = async () => {
    let connection;
    while (!connection) {
        try {
            connection = await amqp.connect('amqp://localhost:5672');
        } catch {
            await wait(2000);
        }
    }

    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    channel.consume(queueName, async (message) => {
        const input = JSON.parse(message.content.toString());
        console.log(`Received message: ${JSON.stringify(input)}`);
        channel.ack(message);
    });
    console.log(`Waiting for messages...`);
};

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
