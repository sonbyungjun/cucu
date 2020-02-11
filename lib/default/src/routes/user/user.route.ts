import { Router } from 'express';
import UserController from './user.controller';
import Route from '../../interfaces/routes.interface';
import { verifyToken } from "../../middlewares/verifyToken.middleware";
import {createValidator} from "express-joi-validation";
const validator = createValidator({passError: true});
import { userUpdateSchema } from "../auth/auth.schema";

class UserRoute implements Route {
  public path = '/user';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     *  /user/info:
     *    get:
     *      tags:
     *      - user
     *      summary: (권한 - 일반사용자) 유저정보
     *      description: 유저정보
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: 로그인 시 발급 받았던 token, "bearer {token}"으로 입력
     *          required: true
     *      responses:
     *        200:
     *          description: 성공
     *          schema:
     *            $ref: "#/definitions/userInfo"
     *        203:
     *          description: 데이터 없음.
     *        202:
     *          description: 입력 형식 에러.
     *        209:
     *          description: 기타 에러
     */
    this.router.get(`${this.path}/info`, verifyToken, this.userController.info);

    /**
     * @swagger
     *  /user/update:
     *    put:
     *      tags:
     *      - user
     *      summary: (권한 - 일반사용자) 유저 업데이트
     *      description: 유저 업데이트
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: 로그인 시 발급 받았던 token, "bearer {token}"으로 입력
     *          required: true
     *        - in: body
     *          name: body
     *          description: 정보를 입력해주세요 자세한 사항은 model 클릭
     *          required: true
     *          schema:
     *            $ref: '#/definitions/userUpdate'
     *      responses:
     *        200:
     *          description: 성공
     *          schema:
     *            $ref: '#/definitions/success'
     *        203:
     *          description: 데이터 없음.
     *        202:
     *          description: 입력 형식 에러.
     *        209:
     *          description: 기타 에러
     */
    this.router.put(`${this.path}/update`, verifyToken, validator.body(userUpdateSchema), this.userController.userUpdate);

    /**
     * @swagger
     *  /user/withdrawal:
     *    delete:
     *      tags:
     *      - user
     *      summary: (권한 - 일반사용자) 회원탈퇴
     *      description: 회원탈퇴
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: 로그인 시 발급 받았던 token, "bearer {token}"으로 입력
     *          required: true
     *      responses:
     *        200:
     *          description: 성공
     *        203:
     *          description: 데이터 없음.
     *        202:
     *          description: 입력 형식 에러.
     *        209:
     *          description: 기타 에러
     */
    this.router.delete(`${this.path}/withdrawal`, verifyToken, this.userController.withdrawal);
  }
}

export default UserRoute;
