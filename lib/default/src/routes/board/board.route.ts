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
     *      summary: (권한 - 로그인) board 등록
     *      description: board 등록
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
     *            $ref: '#/definitions/board'
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
    this.router.post(`${this.path}/register`, verifyToken, validator.body(boardSchema), this.boardController.create);

    /**
     * @swagger
     *  /board/list:
     *    get:
     *      tags:
     *      - board
     *      summary: (권한 - 로그인) board 리스트
     *      description: board 리스트
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
    this.router.get(`${this.path}/list`, verifyToken, this.boardController.list);

    /**
     * @swagger
     *  /board/detail:
     *    get:
     *      tags:
     *      - board
     *      summary: (권한 - 로그인) board 상세보기
     *      description: board 상세보기
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
     *          description: board id
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
    this.router.get(`${this.path}/detail`, verifyToken, this.boardController.detail);

    /**
     * @swagger
     *  /board/update:
     *    put:
     *      tags:
     *      - board
     *      summary: (권한 - 로그인) board 변경
     *      description: board 변경
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
     *          description: board id
     *        - in: body
     *          name: body
     *          description: 정보를 입력해주세요 자세한 사항은 model 클릭
     *          required: true
     *          schema:
     *            $ref: '#/definitions/board'
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
    this.router.put(`${this.path}/update`, verifyToken, validator.body(boardUpdateSchema), this.boardController.update);

    /**
     * @swagger
     *  /board/remove:
     *    delete:
     *      tags:
     *      - board
     *      summary: (권한 - 로그인) board 삭제
     *      description: board 삭제
     *      produces:
     *        - applicaion/json
     *      parameters:
     *        - in: header
     *          name: authorization
     *          description: 로그인 시 발급 받았던 token, "bearer token"으로 입력
     *          required: true
     *        - in: query
     *          name: id
     *          description: board ID
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
    this.router.delete(`${this.path}/remove`, verifyToken, this.boardController.delete);
  }
}

export default BoardRoute;

