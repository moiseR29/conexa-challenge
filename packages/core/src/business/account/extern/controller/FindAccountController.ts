import { Request, Response } from 'express';
import { Logger, HTTP_STATUS } from '../../../../utils';
import { FindAccount } from '../../useCase';
import { MongoAccountDAO } from '../dao/mongo/MongoAccountDAO';

export class FindAccountController {
  async run(req: Request, res: Response): Promise<any> {
    const Log: Logger = new Logger('Find Account Controller');
    try {
      const accountDAO = new MongoAccountDAO();

      const { page = 1, limit = 10 } = req.query;

      const useCase = new FindAccount({
        accountDAO,
        payload: {
          account: req.params.account ?? '',
          limit: Number(limit),
          offset: Number(page),
        },
      });

      const responseUseCase = await useCase.run();
      return res.status(HTTP_STATUS.OK).send(responseUseCase);
    } catch (error) {
      Log.error(error.message);
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .send({ message: error.message });
    }
  }
}
