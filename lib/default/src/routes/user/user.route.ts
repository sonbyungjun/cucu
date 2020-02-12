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
     *      summary: (Role - Member) user info
     *      description: user info
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: Authorization "bearer token"
     *          required: true
     *      responses:
     *        200:
     *          description: success
     *          schema:
     *            $ref: "#/definitions/userInfo"
     *        202:
     *          description: Validation Error
     *        203:
     *          description: missing data
     *        209:
     *          description: Other error
     */
    this.router.get(`${this.path}/info`, verifyToken, this.userController.info);

    /**
     * @swagger
     *  /user/update:
     *    put:
     *      tags:
     *      - user
     *      summary: (Role - Member) update user
     *      description: update user
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
     *            $ref: '#/definitions/userUpdate'
     *      responses:
     *        200:
     *          description: success
     *          schema:
     *            $ref: '#/definitions/success'
     *        202:
     *          description: Validation Error
     *        203:
     *          description: missing data
     *        209:
     *          description: Other error
     */
    this.router.put(`${this.path}/update`, verifyToken, validator.body(userUpdateSchema), this.userController.userUpdate);

    /**
     * @swagger
     *  /user/withdrawal:
     *    delete:
     *      tags:
     *      - user
     *      summary: (Role - Member) withdrawal
     *      description: withdrawal
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: Authorization "bearer token"
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
    this.router.delete(`${this.path}/withdrawal`, verifyToken, this.userController.withdrawal);
  }
}

export default UserRoute;
