import express, { Express } from 'express';
import dotenv from 'dotenv';
import eventRouter from './src/routes/event';
import './src/db';
import cors from 'cors';

dotenv.config();
const PORT: number | string = process.env.PORT || 3000;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use('/api', eventRouter);

app.listen(PORT, (e?: Error) => {
    if (e) console.log(e);
    console.log(`Server has been started in port ${PORT}`);
});