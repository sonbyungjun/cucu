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
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
