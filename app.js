import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index.js';
import aboutRouter from './routes/about.js';
import imageRouter from './routes/image.js';
import backgroundsRouter from './routes/backgrounds.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/backgrounds', express.static(path.join(__dirname, 'public', 'backgrounds')));

app.use('/api', indexRouter);
app.use('/api/about', aboutRouter);
app.use('/api/image', imageRouter);
app.use('/api/backgrounds', backgroundsRouter);

// 404 Not found для API
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: `API endpoint not found: ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
  console.error('[API ERROR]', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;


