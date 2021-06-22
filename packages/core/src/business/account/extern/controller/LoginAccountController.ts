import { Request, Response } from 'express';
import { Logger, HTTP_STATUS, CONEXA_TOKEN } from '../../../../utils';
import { Login } from '../../useCase';
import { MongoAccountDAO } from '../dao/mongo/MongoAccountDAO';

export class LoginController {
  async run(req: Request, res: Response): Promise<any> {
    const Log: Logger = new Logger('Login');
    try {
      const accountDAO = new MongoAccountDAO();

      const useCase = new Login({
        accountDAO,
        payload: {
          username: req.body.username,
          password: req.body.password,
        },
      });

      const { token, ...rest } = await useCase.run();
      res.setHeader(CONEXA_TOKEN, token);
      return res.status(HTTP_STATUS.OK).send({ ...rest });
    } catch (error) {
      Log.error(error.message);
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .send({ message: error.message });
    }
  }
}
