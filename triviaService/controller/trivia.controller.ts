import * as JSONStream from 'JSONStream';
import fetch from 'node-fetch';
import { Writable } from 'stream';

export const fetchTriviaQuestionsStream = async () => {
    const API_URL = 'https://opentdb.com/api.php?amount=10';

    const triviaStream = (await fetch(API_URL)).body.pipe(
        JSONStream.parse('results.*')
    );
    return triviaStream;
};
