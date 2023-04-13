import { ErrorHandler } from './middlewares/ErrorHandler';

import * as express from 'express';

import { index as sunsetRouter } from './routes/sunsets';
import * as bodyparser from 'body-parser';
import { index as userRouter } from './routes/users';
export const app = express();
//routes
app.set('port', process.env.PORT || 3000);
app.use(bodyparser.json());
app.use('/sunsets', sunsetRouter);
app.use('/users', userRouter);
app.use(ErrorHandler);
