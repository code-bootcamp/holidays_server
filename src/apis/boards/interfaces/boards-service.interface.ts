import { CreateBoardInput } from '../dto/create-board.input';
import { UpdateBoardInput } from '../dto/update-board.input';

export interface IBoardsServiceCreate {
  createBoardInput: CreateBoardInput;
  user_id: string;
}

export interface IBoardsServiceUpdate {
  updateBoardInput: UpdateBoardInput;
}

export interface IBoardsServiceFindAll {
  createdAt: number;
}
