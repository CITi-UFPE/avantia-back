import session from 'express-session';
import mongoStoreGen from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

const MongoDBStore = mongoStoreGen(session);

const store = new MongoDBStore({
  url: process.env.MONGO_URI,
  autoRemove: 'disabled',
  collection: 'avantia-sessions',
  secret: process.env.SECRET,
});

store.all((arr, sessions) => {
  console.log(sessions);
});;

const middleware = session({
  secret: process.env.SECRET,
  cookie: {
    httpOnly: true,
    path: '/',
    secure: process.env.SECURE === 'true',
    expires: new Date(Date.now() + 20 * 60 * 1000),
  },
  genid: (req) => req.ip,
  store,
  resave: false,
  rolling: true,
  saveUninitialized: true,
});

export default ({
  middleware,
  store,
});
