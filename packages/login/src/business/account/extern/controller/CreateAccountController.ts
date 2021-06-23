import { Request, Response } from 'express';
import { Logger, HTTP_STATUS } from '../../../../utils';
import { CoreApi, AccountPayload } from '../../../../services';

export class CreateAccountController {
  async run(req: Request, res: Response): Promise<any> {
    const Log: Logger = new Logger('Create Account');
    try {
      const body = <AccountPayload>req.body;

      if (!body.password || !body.username)
        throw new Error('username and password can´t be empty');

      const result = await CoreApi.createAccount(body);

      if (result.status !== HTTP_STATUS.CREATED)
        throw new Error('Error al crear la cuenta');

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
