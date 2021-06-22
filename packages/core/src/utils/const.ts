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

export interface TokenData {
  accountId?: number;
  username: string;
}