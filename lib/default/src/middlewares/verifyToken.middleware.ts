import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';
import UserModel from '../routes/user/user.model';
import User from '../routes/user/user.model';
import HttpException from "../exceptions/HttpException";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, async (authError, user: User, info) => {
    if (authError) {
      return next(authError);
    }
    if (!user) {
      next(new HttpException(203, true, info.message === 'No auth token' ? '로그인 후 이용해주세요' : info.message));
    }
    const exUser: UserModel = await UserModel.findOne({ where: { id: user.id }});
    if (!exUser) {
      next(new HttpException(202, true, '유저 정보가 없습니다.'));
    }
    req.user = user;
    return next();
  })(req, res, next);
};
