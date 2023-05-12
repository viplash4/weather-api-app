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

    const transformStream = new Transform({
        objectMode: true,
        transform: async (chunk, encoding, callback) => {
            try {
                const question = {
                    category: chunk.category,
                    type: chunk.type,
                    difficulty: chunk.difficulty,
                    question: chunk.question,
                    correct_answer: chunk.correct_answer,
                    incorrect_answers: chunk.incorrect_answers,
                };
                await Questions.create(question);
                callback(null, chunk);
            } catch (err) {
                callback(err);
            }
        },
    });

    return new Promise((resolve, reject) => {
        pipeline(fetchData.body, parser, transformStream, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log(`questions: ${JSON.stringify(questions)}`);
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
        console.log(`Received message: ${input}`); //JSON.stringify(input)
        const questionNumber = input;
        const questions = await fetchTriviaQuestions(questionNumber);
        const tableContent = await Questions.findAll();
        console.log(tableContent);
        channel.ack(message);
    });
    console.log(`Waiting for messages...`);
};

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
