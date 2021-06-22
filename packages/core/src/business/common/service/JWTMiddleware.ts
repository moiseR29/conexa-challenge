import { Request, Response, NextFunction } from 'express';
import {
  CryptManager,
  CONEXA_TOKEN,
  HTTP_STATUS,
  Logger,
} from '../../../utils';

export class JWTMiddleware {
  run(req: Request, res: Response, next: NextFunction) {
    const Log: Logger = new Logger('JWT MIDD');
    try {
      const token = req.get(CONEXA_TOKEN);

      if (!token) {
        Log.error(`Token not exists`);
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .send({ message: 'You don´t have permissions' });
      }

      CryptManager.verifyToken(token);

      next();
    } catch (error) {
      Log.error(`Invalid Token`);
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .send({ message: error.message });
    }
  }
}
