export interface CoreApi {
  key: string;
  domain: string;
}

export interface Session {
  salt: number;
  secret: string;
}

export interface Server {
  port: number;
  basePath: string;
  env: string;
  accessToken: string;
}

export interface Config {
  coreApi: CoreApi;
  session: Session;
  server: Server;
}
