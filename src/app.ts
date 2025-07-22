import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import logger from "./utils/logger.js";

import indexRouter from './routes/index.js';
import aboutRouter from './routes/about.js';
import imageRouter from './routes/image.js';
import backgroundsRouter from './routes/backgrounds.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, '../public')));
app.use('/backgrounds', express.static(path.join(__dirname, '../public/backgrounds')));

app.use('/api', indexRouter);
app.use('/api/about', aboutRouter);
app.use('/api/image', imageRouter);
app.use('/api/background', backgroundsRouter);

// 404 Not found для API
app.use('/api/*', (req: Request, res: Response) => {
   res.status(404).json({ error: `API endpoint not found: ${req.originalUrl}` });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
   logger.error('[API ERROR]', err);
   let status = 500;
   let message = 'Internal Server Error';

   if (err && typeof err === 'object' && 'message' in err) {
      message = String((err as { message: unknown }).message);
   }

   if (err && typeof err === 'object' && 'status' in err) {
      const s = (err as { status: unknown }).status;
      if (typeof s === 'number') status = s;
   }

   res.status(status).json({ error: message });
});

export default app;
