import { Request, Response, NextFunction } from 'express';
import config from '../../../config';
import { CryptManager, ACCESS_KEY, HTTP_STATUS, Logger } from '../../../utils';

export class AccessKeyMiddleware {
  async run(req: Request, res: Response, next: NextFunction) {
    const Log: Logger = new Logger('Token Access MIDD');
    try {
      const key = req.get(ACCESS_KEY);

      if (!key) {
        Log.error(`key not exists`);
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send({ message: 'You need key' });
      }
      const result = await CryptManager.compare(config.server.accessToken, key);
      if (!result)
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .send({ message: 'Incorrect Key' });

      next();
    } catch (error) {
      Log.error(`Invalid Token`);
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .send({ message: error.message });
    }
  }
}
