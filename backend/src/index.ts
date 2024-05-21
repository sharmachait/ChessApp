import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import authRouter from './routers/auth';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { accessToken } from './middlewares/AuthMiddleware';
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
    app.use(cookieParser(process.env.cookieParserSecret));
    app.use(bodyParser.json());
    app.use(accessToken);
    app.use('/auth', authRouter);
    const server = app.listen(process.env.PORT, () => {
      console.log(`listening on ${process.env.PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
startUp();
