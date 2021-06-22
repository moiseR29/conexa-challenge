export interface Database {
  user: string;
  password: string;
  host: string;
  port: number;
  db: string;
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
  database: Database;
  session: Session;
  server: Server;
}
