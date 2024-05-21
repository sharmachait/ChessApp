import express, { Express, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import repositoryProvider from '../Infra/repositoryProvider';
import { auth } from '../middlewares/AuthMiddleware';
require('dotenv').config();

const authRouter = express.Router();

authRouter.post('/changePassword', auth, (req, res) => {});
authRouter.get('/test', (req, res) => {
  res.send('hi');
});
authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log({ username });
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
        username: true,
        id: true,
      },
    });
    return res.status(201).json({ msg: 'User Registered', response: newUser });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

authRouter.get('/profile', auth, async (req: Request, res: Response) => {
  const username = req.username;
  const id = req.id;
  try {
    const user = await repositoryProvider.user.findFirst({
      where: {
        username: username,
      },
      select: {
        username: true,
        role: true,
        id: true,
      },
    });

    if (!user) {
      res.status(404).json({ msg: 'User not found' });
      return;
    }
    res
      .status(200)
      .json({ username: user.username, role: user.role, id: user.id });
    return;
  } catch (e) {
    res.status(404).json({ msg: 'User not found' });
    return;
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(402).json({ msg: 'invalid credentials.' });
    return;
  }
  try {
    const user = await repositoryProvider.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) {
      res.status(404).json({ msg: 'User not found' });
      return;
    }
    // const salt = user.passwordSalt;
    const match = bcrypt.compareSync(password, user.passwordHash);
    if (!match) {
      res.status(402).json({ msg: 'invalid credentials.' });
      return;
    }
    let token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.JwtSecret as string
    );
    res
      .cookie('at', token, { sameSite: 'none', secure: true })
      .status(201)
      .json({ id: user.id, username });
  } catch (e) {
    res.status(404).json({ msg: 'User not found' });
    return;
  }
});

export default authRouter;
