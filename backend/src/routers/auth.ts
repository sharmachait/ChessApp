import express, { Express, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import repositoryProvider from '../Infra/repositoryProvider';
require('dotenv').config();

const authRouter = express.Router();
authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await repositoryProvider.user.findFirst({
      where: {
        username: username,
      },
    });
    if (user != null) {
      res.status(409).json({ error: 'User with this email already exists.' });
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const emailConfirmationToken = bcrypt.hashSync(username, salt);
    const newUser = await repositoryProvider.user.create({
      data: {
        username: username,
        passwordHash: hashedPassword,
        passwordSalt: salt,
        emailConfirmationToken: emailConfirmationToken,
        role: 'PLAYER',
      },
      select: {
        id: true,
      },
    });
    return res.status(201).json({ response: newUser });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

export default authRouter;
