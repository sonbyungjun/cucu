import { Sequelize } from 'sequelize-typescript';
// @ts-ignore
let env: 'production' | 'development' = process.env.NODE_ENV;
import config from '../../config/config';
import { fileNestedStatic } from '../utils/util';
import User from '../routes/user/user.model';

export const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, {
  logging: config[env].options.logging,
  host: config[env].options.host,
  dialect: 'mysql',
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
  pool: {
    min: 0,
    max: 30,
    idle: 10000,
    acquire: 30000,
  },
});

export async function sequelizeInitialize() {
  let files = fileNestedStatic('./src/routes').filter(f => f.indexOf('.model.ts') > 0);
  let models = [];
  for (let file of files) {
    file = file.replace('.ts', '');
    file = file.replace('src/', '');
    const module = await import('.' + file);
    models.push(module.default);
  }

  sequelize.addModels(models);

  await sequelize.sync();
}

sequelize.authenticate().catch(err => {
  console.error('Unable to connect to the database:', err);
});
