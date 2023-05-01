import * as JSONStream from 'JSONStream';
import fetch from 'node-fetch';
import * as through2 from 'through2';

export const fetchTriviaQuestions = async () => {
    const API_URL = 'https://opentdb.com/api.php?amount=10';

    const readableStream = (await fetch(API_URL)).body.pipe(
        JSONStream.parse('results.*')
    );

    const transformStream = through2.obj((question, _, callback) => {
        console.log(question);
        callback(null, question);
    });

    readableStream.pipe(transformStream);
};
