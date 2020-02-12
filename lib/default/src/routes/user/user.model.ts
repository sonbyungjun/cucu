import * as bcrypt from "bcrypt";
import { AllowNull, Column, Comment, DataType, DefaultScope, Model, Table } from "sequelize-typescript";

@DefaultScope(() => ({
  attributes: {
    exclude: [
      'deletedAt',
      'updatedAt',
    ]
  }
}))
@Table({
  modelName: 'user',
  timestamps: true,
  paranoid: true,
  comment: 'users',
})
export default class User extends Model<User> {

  @Comment('loginId')
  @AllowNull(false)
  @Column(DataType.STRING(45))
  loginId: string;

  @Comment('password')
  @AllowNull(false)
  @Column(DataType.STRING(255))
  set password(val: string) {
    if (val.length != 0) {
      const hash = bcrypt.hashSync(val, 12);
      this.setDataValue('password', hash);
    }
  }

  @Comment('name')
  @AllowNull(false)
  @Column(DataType.STRING(15))
  name: string;

  public static async findOneAndScope(userId: string): Promise<User> {
    return User.findOne({
      attributes: {
        exclude: [
          'password',
          'createdAt'
        ]
      },
      where: {
        id: userId,
      }
    });
  };

}
