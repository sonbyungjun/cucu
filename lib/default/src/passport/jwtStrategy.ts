import { Strategy as JWTStrategy, VerifiedCallback } from 'passport-jwt';
import { ExtractJwt as ExtractJWT } from 'passport-jwt';
import passport from 'passport';

export default (passport: passport.PassportStatic) => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwtPayload: string, done: VerifiedCallback) => {
        try {
          done(null, jwtPayload);
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
