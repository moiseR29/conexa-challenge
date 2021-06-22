import { Request, Response } from 'express';
import { Logger, HTTP_STATUS } from '../../../../utils';
import { CreateAccount } from '../../useCase';
import { MongoAccountDAO } from '../dao/mongo/MongoAccountDAO';

export class CreateAccountController {
  async run(req: Request, res: Response): Promise<any> {
    const Log: Logger = new Logger('Create Account');
    try {
      const accountDAO = new MongoAccountDAO();

      const useCase = new CreateAccount({
        accountDAO,
        payload: {
          username: req.body.username,
          password: req.body.password,
        },
      });

      const responseUseCase = await useCase.run();
      return res.status(HTTP_STATUS.CREATED).send(responseUseCase);
    } catch (error) {
      Log.error(error.message);
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .send({ message: error.message });
    }
  }
}
