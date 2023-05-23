import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FetchBoardReviews } from './dto/fetch-boardReviews.output';
import { BoardReview } from './entities/board_review.entity';
import {
  IBoardReviewsServiceCreate,
  IBoardReviewsServiceFindAllById,
  IBoardReviewsServiceUpdate,
} from './interfaces/board_reviews-service.interface';

@Injectable()
export class BoardReviewsService {
  constructor(
    @InjectRepository(BoardReview)
    private readonly boardReviewsRepository: Repository<BoardReview>, //
  ) {}

  findAllById({
    board_id,
    page,
  }: IBoardReviewsServiceFindAllById): Promise<FetchBoardReviews[]> {
    const pageSize = 5;

    const result = this.boardReviewsRepository
      .createQueryBuilder('board_review')
      .select([
        'u.name AS name',
        'board_review.br_id AS br_id',
        'board_review.content AS content',
      ])
      .innerJoin('user', 'u', 'u.user_id = board_review.user_userId')
      .where('board_review.board_boardId = :board_id', { board_id })
      .orderBy('board_review.createdAt', 'DESC')
      .limit(pageSize)
      .offset(pageSize * (page - 1))
      .getRawMany();

    return result;
  }

  async create({
    user_id,
    createBoardReviewInput,
  }: IBoardReviewsServiceCreate): Promise<string> {
    const board_id = createBoardReviewInput.board_id;
    const result = await this.boardReviewsRepository.save({
      board_: { board_id },
      user_: { user_id },
      ...createBoardReviewInput,
    });

    return result.br_id;
  }

  async update({ updateBoardReviewInput }: IBoardReviewsServiceUpdate) {
    const br_id = updateBoardReviewInput.br_id;

    const result = await this.boardReviewsRepository.update(
      { br_id },
      { ...updateBoardReviewInput },
    );

    return result.affected ? true : false;
  }

  async delete({ br_id }): Promise<boolean> {
    const result = await this.boardReviewsRepository.softDelete({ br_id });

    return result.affected ? true : false;
  }
}
