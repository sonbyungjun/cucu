import { Strategy as LocalStrategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import UserModel from '../routes/user/user.model';
import passport from 'passport';

export default (passport: passport.PassportStatic) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'loginId',
        passwordField: 'password',
      },
      async (loginId, password, done) => {
        try {
          const exUser: UserModel = await UserModel.findOne({
            where: { loginId },
          });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: 'ID does not exist or password does not match.' });
            }
          } else {
            done(null, false, { message: 'This member is not registered.' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
