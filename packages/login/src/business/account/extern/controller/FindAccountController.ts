import { Request, Response } from 'express';
import { Logger, HTTP_STATUS } from '../../../../utils';
import { CoreApi } from '../../../../services';

export class FindAccountController {
  async run(req: Request, res: Response): Promise<any> {
    const Log: Logger = new Logger('Find Account Controller');
    try {
      const token = req.get('x-conexa-token');

      if (!token) throw new Error('need token');

      const response = await CoreApi.getAccounts(token);

      if (response.status) {
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
