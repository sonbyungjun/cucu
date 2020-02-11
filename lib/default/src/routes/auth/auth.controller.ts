import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";
import * as passport from "passport";
import { Container } from "typedi";

class AuthController {

  public authService: AuthService = Container.get(AuthService);

  public join = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authService.userCreate(req.body);
      res.status(200).json({
        status: 200,
        result: true,
        message: 'success',
      });
    } catch (e) {
      next(e);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (authError, user, info) => {
      if (authError) {
        return next(authError);
      }
      if (!user) {
        return res.json({
          status: 400,
          result: false,
          message: info.message,
        });
      }
      return req.login(user, { session: false }, loginError => {
        if (loginError) {
          return next(loginError);
        }
        const token = this.authService.createJwt(user);
        return res.json({
          status: 200,
          result: true,
          message: 'success',
          token,
        });
      });
    })(req, res, next);
  };

}

export default AuthController;
