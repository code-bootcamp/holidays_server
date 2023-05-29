import { CreateBoardReviewInput } from '../dto/create-boardReview.input';
import { UpdateBoardReviewInput } from '../dto/update-boardReview.input';

export interface IBoardReviewsServiceCreate {
  user_id: string;
  createBoardReviewInput: CreateBoardReviewInput;
}

export interface IBoardReviewsServiceUpdate {
  updateBoardReviewInput: UpdateBoardReviewInput;
}

export interface IBoardReviewsServiceFindAllById {
  board_id: string;
  page: number;
}
