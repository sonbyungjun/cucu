import { NextFunction, Request, Response } from 'express';
import BoardService from './board.service';
import { Container } from "typedi";

class BoardController {
  public boardService: BoardService = Container.get(BoardService);

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.boardService.create({
        ...req.body
      });
      res.status(200).json({
        status: 200,
        message: "success",
      });
    } catch (e) {
      next(e);
    }
  };

  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const list = await this.boardService.list({
        page: req.query.page,
        limit: req.query.limit
      });
      res.status(200).json({
        status: 200,
        message: "success",
        list
      });
    } catch (e) {
      next(e);
    }
  };

  public detail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const board = await this.boardService.detail(req.query.id);
      res.status(200).json({
        status: 200,
        message: "success",
        board
      });
    } catch (e) {
      next(e);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.boardService.update({
        ...req.body,
        id: req.query.id
      });
      res.status(200).json({
        code: 200,
        resultMsg: "success",
      });
    } catch (e) {
      next(e);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.boardService.remove(req.query.id);
      res.status(200).json({
        status: 200,
        message: "success",
      });
    } catch (e) {
      next(e);
    }
  };

}

export default BoardController;

