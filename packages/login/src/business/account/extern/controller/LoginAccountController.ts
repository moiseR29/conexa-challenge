import { Request, Response } from 'express';
import { Logger, HTTP_STATUS } from '../../../../utils';
import { AccountPayload, CoreApi } from '../../../../services';

export class LoginController {
  async run(req: Request, res: Response): Promise<any> {
    const Log: Logger = new Logger('Login');
    try {
      const body = <AccountPayload>req.body;

      if (!body.password || !body.username)
        throw new Error('username and password can´t be empty');

      const result = await CoreApi.login(body);

      if (result.status !== HTTP_STATUS.OK)
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send({ message: result.data });

      res.setHeader('x-conexa-token', result.headers['x-conexa-token']);
      return res.status(HTTP_STATUS.CREATED).send(result);
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
