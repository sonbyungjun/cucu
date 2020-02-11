import {AllowNull, Column, Comment, DataType, Model, Table} from 'sequelize-typescript';
import {FindAndCountOptions, FindOptions} from "sequelize";
import {listOption} from "./board.service";

@Table({
  modelName: 'board',
  timestamps: true,
  paranoid: true,
  comment: 'board',
})
export default class Board extends Model<Board> {

  @Comment('title')
  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @Comment('content')
  @AllowNull(false)
  @Column(DataType.TEXT)
  content: string;


  public static async findAllPage({ page, limit = '15' }: listOption): Promise<{ rows: Board[]; count: number } | Board[]> {
    let offset = 0;
    let pageNumber = Number(page);
    let pageLimit = Number(limit);
    if (pageNumber > 1){
      offset = pageLimit * (pageNumber - 1);
    }
    const option: FindAndCountOptions = {
      order: [['id', 'desc']],
    };
    let board;
    if (page) {
      option.limit = pageLimit;
      option.offset = offset;
      board = await Board.findAndCountAll(option);
    } else {
      board = await Board.findAll(option);
    }
    return board;
  };

  public static async findOneScope(id: string): Promise<Board> {
    const option: FindOptions = {
      where: {
        id
      }
    };
    return Board.findOne(option);
  };

}
