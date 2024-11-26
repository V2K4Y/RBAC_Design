import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './routes';


dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    
    res.json({
        message: "Everything is running fine!"
    })
})

app.use('/', router);
 
export { app, prisma }