import HttpException from '../../exceptions/HttpException';
import User from "./user.model";
import {Service} from "typedi";

export interface IUserUpdate {
  userId: string,
  password?: string,
  name?: string,
  birth?: string,
}

@Service()
class UserService {

  public async detail(id: string): Promise<User> {
    let user = await User.findOneAndScope(id);
    if (!user) {
      throw new Error('없는 유저 입니다.');
    }
    return user;
  };

  public async findByUpdate({ userId, ...values }: IUserUpdate): Promise<User> {
    const user = await User.findOneAndScope(userId);
    if (!user) {
      throw new HttpException(203, true, '없는 User ID 입니다.');
    }
    return user.update(values);
  };

  public async del({ userId }: IUserUpdate): Promise<void> {
    const exUser = await User.findByPk(userId);
    if (!exUser) {
      throw new HttpException(203, true,'없는 데이터 입니다.');
    }
    await exUser.destroy();
  };


}

export default UserService;
