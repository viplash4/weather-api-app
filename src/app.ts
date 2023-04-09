import express from 'express';

import { index } from './routes/index';
export const app = express();

app.set('port', process.env.PORT || 3000);
app.use('/', index);
