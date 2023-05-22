import { CreateClassReviewInput } from '../dto/create-classReview.input';
import { UpdateClassReviewInput } from '../dto/update-classReview.input';

export interface IClassReviewsServiceCreate {
  user_id: string;
  createClassReviewInput: CreateClassReviewInput;
}

export interface IClassReviewsServiceUpdate {
  updateClassReviewInput: UpdateClassReviewInput;
}

export interface IClassReviewsServiceFindAllById {
  class_id: string;
}
