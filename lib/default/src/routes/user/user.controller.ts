import { NextFunction, Request, Response } from "express";
import userService from "./user.service";
import User from "./user.model";
import { Container } from "typedi";

class UserController {
  public userService: userService = Container.get(userService);

  public info = async (req: Request & { user: User }, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.detail(req.user.id);
      res.status(200).json({
        status: 200,
        message: "success",
        user
      });
    } catch (e) {
      next(e);
    }
  };

  public userUpdate = async (req: Request & { user: User }, res: Response, next: NextFunction) => {
    try {
      await this.userService.findByUpdate({
        userId: req.user.id,
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

  public withdrawal = async (req: Request & { user: User }, res: Response, next: NextFunction) => {
    try {
      await this.userService.del({
        userId: req.user.id
      });
      res.status(200).json({
        status: 200,
        message: "success",
      });
    } catch (e) {
      next(e);
    }
  };

}

export default UserController;
