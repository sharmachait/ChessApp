import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function accessToken(req: Request, res: Response, next: NextFunction) {
  const cookies = req.cookies;
  const at = cookies.at;
  console.log({ at });
  if (!at) {
    //Bearer token
    const hat = ((req.header('Authorization') as string) || '').split('').pop();
    if (!!hat) {
      req.aToken = hat;
    }
  } else {
    req.aToken = at;
  }
  next();
}

export async function validateToken(
  token: string,
  req: Request
): Promise<boolean> {
  ///jwt.verify
  const jwtSecret = process.env.JwtSecret;
  type jwtType = {
    id: string;
    username: string;
  };
  try {
    let decodedJson: jwtType = (await jwt.verify(
      token,
      jwtSecret as string
    )) as unknown as jwtType;
    req.username = decodedJson.username;
    req.id = decodedJson.id;
    return true;
  } catch (e) {
    return false;
  }
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  const at = req.aToken;
  const valid: boolean = await validateToken(at, req);
  if (!valid) {
    res.status(401).send('Unauthorized.');
    next(new Error('Unauthorized.'));
    return;
  }
  next();
}
