import mongoose from 'mongoose';

const connection = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

export default connection;
