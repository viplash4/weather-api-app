import { ErrorHandler } from './middlewares/ErrorHandler';

import * as express from 'express';

import { index } from './routes/index';
import * as bodyparser from 'body-parser';
export const app = express();
//routes
app.set('port', process.env.PORT || 3000);
app.use(bodyparser.json());
app.use('/', index);

app.use(ErrorHandler);
