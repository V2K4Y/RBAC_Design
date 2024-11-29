import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './routes';


dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors({origin: 'http://localhost:5173', credentials: true,}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    
    res.json({
        message: "Everything is running fine!"
    })
})

app.use('/', router);
 
export { app, prisma }