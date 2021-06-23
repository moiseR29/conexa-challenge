import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';

export interface AccountPayload {
  username: string;
  password: string;
}

export interface TokenHeader {
  [nameKey: string]: string;
}

export interface CoreResponse {
  status: number | string;
  data: any;
  headers: any;
}

const format = (response: AxiosResponse): CoreResponse => {
  return {
    status: response.status,
    data: response.data,
    headers: response.headers,
  };
};

class CoreApi {
  private _key: string;
  private _domain: string;

  constructor() {
    this._key = config.coreApi.key;
    this._domain = config.coreApi.domain;
  }

  async createAccount(payload: AccountPayload): Promise<CoreResponse> {
    const result = await axios.post(
      `${this._domain}/api/account`,
      payload,
      this.preparedConfig(),
    );
    return format(result);
  }

  async login(payload: AccountPayload): Promise<CoreResponse> {
    const result = await axios.post(
      `${this._domain}/api/login`,
      payload,
      this.preparedConfig(),
    );
    return format(result);
  }

  async getAccounts(
    jwt: string,
    limit: number,
    offset: number,
  ): Promise<CoreResponse> {
    const result = await axios.get(
      `${this._domain}/api/account?page=${offset}&limit=${limit}`,
      this.preparedConfig({
        'x-conexa-token': jwt,
      }),
    );
    return format(result);
  }

  async getAccountByUsername(
    account: string,
    jwt: string,
  ): Promise<CoreResponse> {
    const result = await axios.get(
      `${this._domain}/api/account/${account}`,
      this.preparedConfig({
        'x-conexa-token': jwt,
      }),
    );
    return format(result);
  }

  private preparedConfig(headers?: TokenHeader): AxiosRequestConfig {
    return {
      headers: {
        'content-type': 'application/json',
        'x-access-key': this._key,
        ...headers,
      },
    };
  }
}

const i: CoreApi = new CoreApi();
export { i as CoreApi };
