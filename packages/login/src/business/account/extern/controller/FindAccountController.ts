import { Request, Response } from 'express';
import { Logger, HTTP_STATUS } from '../../../../utils';
import { CoreApi } from '../../../../services';

export class FindAccountController {
  async run(req: Request, res: Response): Promise<any> {
    const Log: Logger = new Logger('Find Account Controller');
    try {
      const token = req.get('x-conexa-token');

      if (!token) throw new Error('need token');

      const { page = 1, limit = 10 } = req.query;

      const account = req.params.account ?? '';
      let response: any;

      if (account)
        response = await CoreApi.getAccountByUsername(account, token);
      else
        response = await CoreApi.getAccounts(
          token,
          Number(limit),
          Number(page),
        );

      if (response.status === HTTP_STATUS.BAD_REQUEST) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send({ message: response.data });
      }

      return res.status(HTTP_STATUS.OK).send(response.data);
    } catch (error) {
      const errorMessage = error.response?.data
        ? error.response.data.message
        : error.message;
      Log.error(errorMessage);
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .send({ message: errorMessage });
    }
  }
}
