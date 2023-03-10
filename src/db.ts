import mongoose, {ConnectOptions} from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(
    process.env.MONGO_URI as string,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions
);

const db = await mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});