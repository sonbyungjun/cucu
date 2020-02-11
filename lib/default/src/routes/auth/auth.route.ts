import { Router } from "express";
import Route from "../../interfaces/routes.interface";
import { createValidator } from "express-joi-validation";
import { userSchema } from "./auth.schema";
import AuthController from "./auth.controller";

const validator = createValidator({passError: true});

class AuthRoute implements Route {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     *  /auth/join:
     *    post:
     *      tags:
     *      - auth
     *      summary: (권한 - 없음) 회원가입
     *      description: 회원가입 입니다.
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: body
     *          name: body
     *          description: 정보를 입력해주세요 자세한 사항은 model 클릭
     *          required: true
     *          schema:
     *            $ref: '#/definitions/user'
     *      responses:
     *        200:
     *          description: 성공
     *          schema:
     *            $ref: '#/definitions/success'
     *        202:
     *          description: 회원가입 실패 ( 아이디 중복 )
     *        400:
     *          description: 입력 형식 에러
     */
    this.router.post(`${this.path}/join`, validator.body(userSchema), this.authController.join);

    /**
     * @swagger
     *  /auth/login:
     *    post:
     *      tags:
     *      - auth
     *      summary: (권한 - 없음) 로그인 (10시간 후 만료됩니다.)
     *      description: 로그인 입니다.
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: body
     *          name: body
     *          description: 로그인 아이디와 패스워드를 입력해주세요.
     *          required: true
     *          schema:
     *            $ref: '#/definitions/login'
     *      responses:
     *        200:
     *          description: 성공 (토큰 발급)
     *        400:
     *          description: 아이디 및 비밀번호 불일치, 입력값이 없음
     */
    this.router.post(`${this.path}/login`, this.authController.login);
  }
}

export default AuthRoute;
