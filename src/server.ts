import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import path from 'path';
import morgan from 'morgan';

// ============ Local Imports ============ //

import {
  requestHandler,
  errorHandler,
  responseHandler,
} from './handlers';

import routes from './routes';

// ============ Config ============ //

dotenv.config();

// ============ Application ============ //

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/static', express.static(path.join(__dirname, './frontend/static')));

app.use(requestHandler);

app.use(routes);

app.use(errorHandler);
app.use(responseHandler);

// ============ Run the Server ============ //

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
