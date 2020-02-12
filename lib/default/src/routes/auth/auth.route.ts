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
     *      summary: (Role - None) SignUp
     *      description: SignUp
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: body
     *          name: body
     *          description: Please enter your membership information.
     *          required: true
     *          schema:
     *            $ref: '#/definitions/user'
     *      responses:
     *        200:
     *          description: success
     *          schema:
     *            $ref: '#/definitions/success'
     *        202:
     *          description: Validation Error
     *        209:
     *          description: failure
     */
    this.router.post(`${this.path}/join`, validator.body(userSchema), this.authController.join);

    /**
     * @swagger
     *  /auth/login:
     *    post:
     *      tags:
     *      - auth
     *      summary: (Role - None) loginIn
     *      description: loginIn
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: body
     *          name: body
     *          description: Please enter your ID and password.
     *          required: true
     *          schema:
     *            $ref: '#/definitions/login'
     *      responses:
     *        200:
     *          description: success
     *        400:
     *          description: Validation Error
     */
    this.router.post(`${this.path}/login`, this.authController.login);
  }
}

export default AuthRoute;
