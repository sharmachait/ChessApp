import express, { Express, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const authRouter = express.Router();
authRouter.post('/register', async (req: Request, res: Response) => {});

export default authRouter;
