import session from 'express-session';
import mongoStoreGen from 'connect-mongodb-session';
import dotenv from 'dotenv';

dotenv.config();

const MongoDBStore = mongoStoreGen(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
  expires: 1000 * 20,
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
    secure: true,
    maxAge: 20 * 1000,
  },
  store,
  resave: true,
  saveUninitialized: false,
});

export default ({
  middleware,
  store,
});
