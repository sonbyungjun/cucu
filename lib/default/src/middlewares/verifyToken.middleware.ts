import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';
import UserModel from '../routes/user/user.model';
import User from '../routes/user/user.model';
import HttpException from '../exceptions/HttpException';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, async (authError, user: User, info) => {
    if (authError) {
      return next(authError);
    }
    if (!user) {
      next(new HttpException(400, info.message === 'No auth token' ? 'Please sign in and use it.' : info.message));
    }
    const exUser: UserModel = await UserModel.findOne({ where: { id: user.id } });
    if (!exUser) {
      next(new HttpException(203, 'User information is missing.'));
    }
    req.user = user;
    return next();
  })(req, res, next);
};
