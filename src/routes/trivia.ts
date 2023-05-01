import { Router } from 'express';

import * as JSONStream from 'JSONStream';
import fetch from 'node-fetch';
const triviaRouter = Router();

triviaRouter.get('/', async (req, res, next) => {
    try {
        const API_URL = 'https://opentdb.com/api.php?amount=10';

        const triviaStream = (await fetch(API_URL)).body.pipe(
            JSONStream.parse('results.*')
        );
        res.send(triviaStream);
    } catch (err) {
        next(err);
    }
});

export default triviaRouter;
