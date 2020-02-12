import HttpException from '../../exceptions/HttpException';
import Board from "./board.model";
import { Service } from "typedi";

export interface listOption {
  page?: string
  limit?: string
}

@Service()
class BoardService {

  public async create(values: Board): Promise<void> {
    await Board.create(values);
  };

  public async list(option: listOption): Promise<{ rows: Board[]; count: number } | Board[]> {
    return Board.findAllPage(option);
  };

  public async detail(id: string): Promise<Board> {
    const board = await Board.findOneScope(id);
    if (!board) {
      throw new HttpException(203, 'missing data');
    }
    return board;
  };

  public async update(values: Board): Promise<void> {
    const { id } = values;
    const board = await Board.findOneScope(id);
    if (!board) {
      throw new HttpException(203, 'missing data');
    }
    await board.update(values);
  };

  public async remove(id: string): Promise<void> {
    const board = await Board.findOneScope(id);
    if (!board) {
      throw new HttpException(203, 'missing data');
    }
    await board.destroy();
  };

}

export default BoardService;

