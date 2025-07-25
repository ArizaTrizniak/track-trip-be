#!/usr/bin/env node

import http from 'http';
import debugLib from 'debug';
import app from './app.js';
import { AddressInfo } from 'net';
import logger from "./utils/logger.js";

const debug = debugLib('track-trip-be:server');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
   logger.info('Server started at http://localhost:' + port);
});
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string): number | string | false {
   const port = parseInt(val, 10);
   if (isNaN(port)) return val;
   if (port >= 0) return port;
   return false;
}

function onError(error: NodeJS.ErrnoException): void {
   if (error.syscall !== 'listen') {
      throw error;
   }

   const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

   switch (error.code) {
      case 'EACCES':
         logger.error(`${bind} requires elevated privileges`);
         process.exit(1);
         break;
      case 'EADDRINUSE':
         logger.error(`${bind} is already in use`);
         process.exit(1);
         break;
      default:
         throw error;
   }
}

function onListening(): void {
   const addr = server.address();
   const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${(addr as AddressInfo).port}`;
   debug(`Listening on ${bind}`);
}
