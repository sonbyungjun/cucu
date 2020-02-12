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
      throw new HttpException(203, 'missing data');
    }
    return user;
  };

  public async findByUpdate({ userId, ...values }: IUserUpdate): Promise<User> {
    const user = await User.findOneAndScope(userId);
    if (!user) {
      throw new HttpException(203, 'missing data');
    }
    return user.update(values);
  };

  public async del({ userId }: IUserUpdate): Promise<void> {
    const exUser = await User.findByPk(userId);
    if (!exUser) {
      throw new HttpException(203,'missing data');
    }
    await exUser.destroy();
  };


}

export default UserService;
