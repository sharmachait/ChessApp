import express, { Express } from 'express';
import bodyParser from 'body-parser';
import authRouter from './routers/auth';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import { accessToken } from './middlewares/AuthMiddleware';
import GameManager from './Engine/GameManager';
import setupSocketServer from './socketServer';
require('dotenv').config();

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
    const gameManager = new GameManager([]);
    await setupSocketServer(server, gameManager);
  } catch (e) {
    console.log(e);
  }
}
startUp();
