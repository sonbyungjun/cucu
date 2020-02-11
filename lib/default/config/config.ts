import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    options: {
      logging: true,
      host: process.env.DB_HOST,
      dialect: 'mysql',
      timezone: '+09:00',
      define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      },
      pool: {
        min: 0,
        max: 30,
        idle: 10000,
        acquire: 30000
      }
    }
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    options: {
      logging: false,
      host: process.env.DB_HOST,
      dialect: 'mysql',
      timezone: '+09:00',
      define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
        }
      },
      pool: {
        min: 0,
        max: 30,
        idle: 10000,
        acquire: 30000
      }
    }
  };

export default config;
