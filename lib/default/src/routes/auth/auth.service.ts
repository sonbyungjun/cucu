import User from "../user/user.model";
import * as jwt from "jsonwebtoken";
import { Service } from "typedi";

@Service()
class AuthService {

  public async userCreate(user: User): Promise<void> {
    const { loginId } = user;
    let transaction = null;
    try {
      transaction = await User.sequelize.transaction({ autocommit: false });
      let exUser = await User.findOne({ where: { loginId } });
      if (exUser) {
        throw new Error('이미 가입된 아이디 입니다.');
      }
      await User.create(user, { transaction });
      await transaction.commit();
    } catch (e) {
      if (transaction) {
        await transaction.rollback();
      }
      throw e;
    }
  }

  public createJwt(user: User): string {
    return jwt.sign(
      {
        id: user.id,
        loginId: user.loginId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '10h',
        issuer: process.env.PROJECT_NAME,
      }
    );
  }

}

export default AuthService;
