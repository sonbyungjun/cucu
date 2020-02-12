import { Router } from 'express';
import Route from '../../interfaces/routes.interface';
import {createValidator} from "express-joi-validation";
const validator = createValidator({passError: true});
import {boardSchema, boardUpdateSchema} from './board.schema';
import BoardController from "./board.controller";
import {verifyToken} from "../../middlewares/verifyToken.middleware";

class BoardRoute implements Route {
  public path = '/board';
  public router = Router();
  public boardController = new BoardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     *  /board/register:
     *    post:
     *      tags:
     *      - board
     *      summary: (Role - Member) Register board
     *      description: Register board
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
     *            $ref: '#/definitions/board'
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
    this.router.post(`${this.path}/register`, verifyToken, validator.body(boardSchema), this.boardController.create);

    /**
     * @swagger
     *  /board/list:
     *    get:
     *      tags:
     *      - board
     *      summary: (Role - Member) List board
     *      description: List board
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: Authorization "bearer token"
     *          required: true
     *        - in: query
     *          name: page
     *          description: page number
     *        - in: query
     *          name: limit
     *          description: page limit
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
    this.router.get(`${this.path}/list`, verifyToken, this.boardController.list);

    /**
     * @swagger
     *  /board/detail:
     *    get:
     *      tags:
     *      - board
     *      summary: (Role - Member) details board
     *      description: details board
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
     *          description: board id
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
    this.router.get(`${this.path}/detail`, verifyToken, this.boardController.detail);

    /**
     * @swagger
     *  /board/update:
     *    put:
     *      tags:
     *      - board
     *      summary: (Role - Member) update board
     *      description: update board
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
     *          description: board id
     *        - in: body
     *          name: body
     *          description: Please enter information in model.
     *          required: true
     *          schema:
     *            $ref: '#/definitions/board'
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
    this.router.put(`${this.path}/update`, verifyToken, validator.body(boardUpdateSchema), this.boardController.update);

    /**
     * @swagger
     *  /board/remove:
     *    delete:
     *      tags:
     *      - board
     *      summary: (Role - Member) delete board
     *      description: delete board
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: Authorization "bearer token"
     *          required: true
     *        - in: query
     *          name: id
     *          description: board ID
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
    this.router.delete(`${this.path}/remove`, verifyToken, this.boardController.delete);
  }
}

export default BoardRoute;

