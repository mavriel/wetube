import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log('connected to db');
const handleError = err => console.log(`❌ ${err}`);
db.once('open', handleOpen);
db.on('error', handleError);
