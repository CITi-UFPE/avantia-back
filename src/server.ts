import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import http from 'http';

// ============ Local Imports ============ //

import {
  requestHandler,
  errorHandler,
  responseHandler,
} from './handlers';

import deleteFiles from './helpers/deleteFiles';

import { storeInjector } from './injectors';

import { createSession, connection } from './config';

import routes from './routes';

// ============ Config ============ //

dotenv.config();

const { middleware: sessionMiddleware, store } = createSession(connection);

// ============ File Cleanup ============ //

deleteFiles();

// ============ Application ============ //

const app = express();

const server = new http.Server(app);

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));
app.use(helmet());
app.use(express.json());
app.use(sessionMiddleware);
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(storeInjector(store));

app.use(requestHandler);

app.use(routes);

app.use(errorHandler);
app.use(responseHandler);

// ============ Run the Server ============ //

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
