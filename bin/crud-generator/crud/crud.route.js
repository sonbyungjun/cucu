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
     *      summary: (권한 - 로그인) ${model.modelComment} 등록
     *      description: ${model.modelComment} 등록
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: 로그인 시 발급 받았던 token, "bearer token"으로 입력
     *          required: true
     *        - in: body
     *          name: body
     *          description: 정보를 입력해주세요 자세한 사항은 model 클릭
     *          required: true
     *          schema:
     *            $ref: '#/definitions/${model.modelName}'
     *      responses:
     *        200:
     *          description: 성공
     *        202:
     *          description: 입력 형식 에러.
     *        203:
     *          description: 데이터 없음.
     *        209:
     *          description: 기타 에러
     */
    this.router.post(\`\${this.path}/register\`, verifyToken, validator.body(${model.modelName}Schema), this.${model.modelName}Controller.create);

    /**
     * @swagger
     *  /${model.modelName}/list:
     *    get:
     *      tags:
     *      - ${model.modelName}
     *      summary: (권한 - 로그인) ${model.modelComment} 리스트
     *      description: ${model.modelComment} 리스트
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: 로그인 시 발급 받았던 token, "bearer {token}"으로 입력
     *          required: true
     *        - in: query
     *          name: page
     *          description: 페이지 번호 page 없으면 전체
     *        - in: query
     *          name: limit
     *          description: 한 페이지에 보여질 갯수 기본값 15개
     *      responses:
     *        200:
     *          description: 성공
     *        202:
     *          description: 입력 형식 에러.
     *        203:
     *          description: 데이터 없음.
     *        209:
     *          description: 기타 에러
     */
    this.router.get(\`\${this.path}/list\`, verifyToken, this.${model.modelName}Controller.list);

    /**
     * @swagger
     *  /${model.modelName}/detail:
     *    get:
     *      tags:
     *      - ${model.modelName}
     *      summary: (권한 - 로그인) ${model.modelComment} 상세보기
     *      description: ${model.modelComment} 상세보기
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: 로그인 시 발급 받았던 token, "bearer {token}"으로 입력
     *          required: true
     *        - in: query
     *          name: id
     *          required: true
     *          description: ${model.modelName} id
     *      responses:
     *        200:
     *          description: 성공
     *        202:
     *          description: 입력 형식 에러.
     *        203:
     *          description: 데이터 없음.
     *        209:
     *          description: 기타 에러
     */
    this.router.get(\`\${this.path}/detail\`, verifyToken, this.${model.modelName}Controller.detail);

    /**
     * @swagger
     *  /${model.modelName}/update:
     *    put:
     *      tags:
     *      - ${model.modelName}
     *      summary: (권한 - 로그인) ${model.modelComment} 변경
     *      description: ${model.modelComment} 변경
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: 로그인 시 발급 받았던 token, "bearer token"으로 입력
     *          required: true
     *        - in: query
     *          name: id
     *          required: true
     *          description: ${model.modelName} id
     *        - in: body
     *          name: body
     *          description: 정보를 입력해주세요 자세한 사항은 model 클릭
     *          required: true
     *          schema:
     *            $ref: '#/definitions/${model.modelName}'
     *      responses:
     *        200:
     *          description: 성공
     *        202:
     *          description: 입력 형식 에러.
     *        203:
     *          description: 데이터 없음.
     *        209:
     *          description: 기타 에러
     */
    this.router.put(\`\${this.path}/update\`, verifyToken, validator.body(${model.modelName}UpdateSchema), this.${model.modelName}Controller.update);

    /**
     * @swagger
     *  /${model.modelName}/remove:
     *    delete:
     *      tags:
     *      - ${model.modelName}
     *      summary: (권한 - 로그인) ${model.modelComment} 삭제
     *      description: ${model.modelComment} 삭제
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: 로그인 시 발급 받았던 token, "bearer token"으로 입력
     *          required: true
     *        - in: query
     *          name: id
     *          description: ${model.modelComment} ID
     *          required: true
     *      responses:
     *        200:
     *          description: 성공
     *        202:
     *          description: 입력 형식 에러.
     *        203:
     *          description: 데이터 없음.
     *        209:
     *          description: 기타 에러
     */
    this.router.delete(\`\${this.path}/remove\`, verifyToken, this.${model.modelName}Controller.delete);
  }
}

export default ${capitalizeFirstLetter(model.modelName)}Route;

`;
}
