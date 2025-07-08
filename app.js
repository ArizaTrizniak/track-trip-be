import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index.js';
import aboutRouter from './routes/about.js';
import imageRouter from './routes/image.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/image', imageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send(`404 Not Found???: ${req.originalUrl}`);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Если не используешь шаблоны (pug/ejs), то лучше заменить:
  // res.render('error');
  // на
  res.status(err.status || 500).send(res.locals.message || 'Internal Server Error');
});

export default app;

