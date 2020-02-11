import local from './localStrategy';
import jwt from './jwtStrategy';
import passport from 'passport';

export default (passport: passport.PassportStatic) => {
  local(passport);
  jwt(passport);
};
