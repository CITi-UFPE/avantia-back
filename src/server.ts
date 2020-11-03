import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import http from 'http';
import mongoose from 'mongoose';

// ============ Local Imports ============ //

import {
  requestHandler,
  errorHandler,
  responseHandler,
} from './handlers';

import deleteFiles from './helpers/deleteFiles';

import { storeInjector } from './injectors';

import { createSession } from './config';

import routes from './routes';

// ================ MONGO DB ================ //

mongoose.connect(process.env.MONGO_URL || process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { connection } = mongoose;

connection.on('error', () => console.log('Failed to establish connection with MongoDB'));
connection.once('open', () => console.log('MongoDB connection established sucessfully'));

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
