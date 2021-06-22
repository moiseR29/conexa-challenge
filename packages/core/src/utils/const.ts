export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIMEOUT = 408,
}

export const CONEXA_TOKEN = 'x-conexa-token';
export const ACCESS_KEY = 'x-access-key';

export interface TokenData {
  accountId: number;
  username: string;
}
