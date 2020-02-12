import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJsdoc from 'swagger-jsdoc';
import * as express from 'express';
const router = express.Router();
import * as dotenv from 'dotenv';
import { nestedStatic } from '../utils/util';

dotenv.config();

let folders = nestedStatic('./src/routes').map(f => f.staticPath + '/*.ts');
folders.push('./swaggers/*.ts');

const options = {
  swaggerDefinition: {
    info: {
      title: `${process.env.PROJECT_NAME} API`,
      version: '1.0.0',
      description: `${process.env.PROJECT_NAME} 의 API 문서입니다.`,
    },
    host: `${process.env.SERVER_IP}:${process.env.PORT || 3000}`,
    basePath: '/',
  },
  apis: folders,
};

if (process.env.NODE_ENV === 'development') {
  options.swaggerDefinition.host = `localhost:${process.env.PORT || 3000}`;
}

const specs = swaggerJsdoc(options);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

export default router;
