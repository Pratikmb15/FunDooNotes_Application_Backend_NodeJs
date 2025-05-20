require('dotenv').config();

export const development = {
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: process.env.PORT,
  dialect: process.env.DIALECT
};
export const test = {
  username: process.env.USERNAME_TEST,
  password: process.env.PASSWORD_TEST,
  database: process.env.DATABASE_TEST,
  host: process.env.HOST_TEST,
  port: process.env.PORT_TEST,
  dialect: process.env.DIALECT_TEST
};
export const production = {
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: process.env.PORT,
  dialect: process.env.DIALECT
};
