import { ErrorHandler } from './middlewares/ErrorHandler';

import * as express from 'express';

import sunsetRouter from './routes/sunsets';
import * as bodyparser from 'body-parser';
import userRouter from './routes/users';
import triviaRouter from './routes/trivia';
import { connect } from '../triviaService/consumer';
import { connectToRabbit } from './producer';
export const app = express();
//routes
app.set('port', process.env.PORT || 3000);
app.use(bodyparser.json());
app.use('/sunsets', sunsetRouter);
app.use('/users', userRouter);
app.use('/trivia', triviaRouter);
app.use(ErrorHandler);
connectToRabbit();
connect();
