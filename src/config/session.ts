import session from 'express-session';
import mongoStoreGen from 'connect-mongodb-session';
import dotenv from 'dotenv';

dotenv.config();

const MongoDBStore = mongoStoreGen(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
});

store.on('error', (err) => {
  console.log(err);
});

store.on('connect', () => {
  console.log('Successfully connected with database');
});

const middleware = session({
  secret: process.env.SECRET,
  cookie: {
    httpOnly: true,
    path: '/',
    secure: false,
    expires: new Date(Date.now() + 20 * 60 * 1000),
  },
  genid: (req) => req.connection.remoteAddress,
  store,
  resave: false,
  rolling: true,
  saveUninitialized: true,
});

export default ({
  middleware,
  store,
});
