import * as amqp from 'amqplib';
import * as JSONStream from 'JSONStream';
import fetch from 'node-fetch';
import { pipeline, Transform } from 'stream';
import Questions from './models/Questions';
const queueName = 'trivia-questions';
export const fetchTriviaQuestions = async (questionNumber) => {
    const API_URL = `https://opentdb.com/api.php?amount=${questionNumber}`;

    const questions = [];

    const fetchData = await fetch(API_URL);
    const parser = JSONStream.parse('results.*');
    const readableStream = fetchData.body.pipe(parser);
    const transformStream = new Transform({
        objectMode: true,
        transform: async (chunk, encoding, callback) => {
            questions.push(chunk);
            callback(null, chunk);
        },
    });

    return new Promise((resolve, reject) => {
        pipeline(readableStream, transformStream, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(questions);
            }
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
        const count = await Questions.count();
        console.log(`The database now contains ${count} questions.`);
    });
    console.log(`Waiting for messages...`);
};

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
