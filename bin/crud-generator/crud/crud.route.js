const capitalizeFirstLetter = require("../util");

module.exports = async function routerParse(model, member) {
  return `import { Router } from 'express';
import Route from '../../interfaces/routes.interface';
import {createValidator} from "express-joi-validation";
const validator = createValidator({passError: true});
import {${model.modelName}Schema, ${model.modelName}UpdateSchema} from './${model.modelName}.schema';
import ${capitalizeFirstLetter(model.modelName)}Controller from "./${model.modelName}.controller";
import {verifyToken} from "../../middlewares/verifyToken.middleware";

class ${capitalizeFirstLetter(model.modelName)}Route implements Route {
  public path = '/${model.modelName}';
  public router = Router();
  public ${model.modelName}Controller = new ${capitalizeFirstLetter(model.modelName)}Controller();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     *  /${model.modelName}/register:
     *    post:
     *      tags:
     *      - ${model.modelName}
     *      summary: (Role - Member) Register ${model.modelComment} 
     *      description: Register ${model.modelComment}
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: Authorization "bearer token"
     *          required: true
     *        - in: body
     *          name: body
     *          description: Please enter information in model.
     *          required: true
     *          schema:
     *            $ref: '#/definitions/${model.modelName}'
     *      responses:
     *        200:
     *          description: success
     *        202:
     *          description: Validation Error
     *        203:
     *          description: missing data
     *        209:
     *          description: Other error
     */
    this.router.post(\`\${this.path}/register\`, verifyToken, validator.body(${model.modelName}Schema), this.${model.modelName}Controller.create);

    /**
     * @swagger
     *  /${model.modelName}/list:
     *    get:
     *      tags:
     *      - ${model.modelName}
     *      summary: (Role - Member) List ${model.modelComment}
     *      description: List ${model.modelComment}
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: Authorization "bearer token"
     *          required: true
     *        - in: query
     *          name: page
     *          description: page number (Default Full Data)
     *        - in: query
     *          name: limit
     *          description: page number (15 default values)
     *      responses:
     *        200:
     *          description: success
     *        202:
     *          description: Validation Error
     *        203:
     *          description: missing data
     *        209:
     *          description: Other error
     */
    this.router.get(\`\${this.path}/list\`, verifyToken, this.${model.modelName}Controller.list);

    /**
     * @swagger
     *  /${model.modelName}/detail:
     *    get:
     *      tags:
     *      - ${model.modelName}
     *      summary: (Role - Member) details ${model.modelComment}
     *      description: details ${model.modelComment}
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: Authorization "bearer token"
     *          required: true
     *        - in: query
     *          name: id
     *          required: true
     *          description: ${model.modelName} id
     *      responses:
     *        200:
     *          description: success
     *        202:
     *          description: Validation Error
     *        203:
     *          description: missing data
     *        209:
     *          description: Other error
     */
    this.router.get(\`\${this.path}/detail\`, verifyToken, this.${model.modelName}Controller.detail);

    /**
     * @swagger
     *  /${model.modelName}/update:
     *    put:
     *      tags:
     *      - ${model.modelName}
     *      summary: (Role - Member) update ${model.modelComment}
     *      description: update ${model.modelComment}
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: Authorization "bearer token"
     *          required: true
     *        - in: query
     *          name: id
     *          required: true
     *          description: ${model.modelName} id
     *        - in: body
     *          name: body
     *          description: Please enter information in model.
     *          required: true
     *          schema:
     *            $ref: '#/definitions/${model.modelName}'
     *      responses:
     *        200:
     *          description: success
     *        202:
     *          description: Validation Error
     *        203:
     *          description: missing data
     *        209:
     *          description: Other error
     */
    this.router.put(\`\${this.path}/update\`, verifyToken, validator.body(${model.modelName}UpdateSchema), this.${model.modelName}Controller.update);

    /**
     * @swagger
     *  /${model.modelName}/remove:
     *    delete:
     *      tags:
     *      - ${model.modelName}
     *      summary: (Role - Member) delete ${model.modelComment}
     *      description: delete ${model.modelComment}
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: Authorization "bearer token"
     *          required: true
     *        - in: query
     *          name: id
     *          description: ${model.modelComment} ID
     *          required: true
     *      responses:
     *        200:
     *          description: success
     *        202:
     *          description: Validation Error
     *        203:
     *          description: missing data
     *        209:
     *          description: Other error
     */
    this.router.delete(\`\${this.path}/remove\`, verifyToken, this.${model.modelName}Controller.delete);
  }
}

export default ${capitalizeFirstLetter(model.modelName)}Route;

`;
}
