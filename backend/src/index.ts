import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import authRouter from './routers/auth';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
require('dotenv').config();

const jwtSecret = process.env.JwtSecret;
const bcryptsalt = bcrypt.genSaltSync(10);

async function startUp() {
  try {
    const app: Express = express();
    app.use(
      cors({
        credentials: true,
        origin: process.env.ClientUrl,
      })
    );
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use('/auth', authRouter);
    const server = app.listen(process.env.PORT, () => {
      console.log(`listening on ${process.env.PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
startUp();
