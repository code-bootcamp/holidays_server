import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardReview } from './entities/board_review.entity';

@Injectable()
export class BoardReviewsService {
  constructor(
    @InjectRepository(BoardReview)
    private readonly boardReviewsRepository: Repository<BoardReview>, //
  ) {}

  findAllById({ board_id }) {
    return this.boardReviewsRepository.find({ where: { board_: board_id } });
  }

  async create({ user_id, createBoardReviewInput }) {
    const test = {
      cr_id: 'test',
      content: '테스트',
      grade: 3,
    };

    return test;
  }

  update({ updateBoardReviewInput }) {
    const test = {
      cr_id: 'test',
      content: '테스트',
      grade: 3,
    };

    return test;
  }

  async delete({ br_id }): Promise<boolean> {
    const result = await this.boardReviewsRepository.softDelete({ br_id });

    return result.affected ? true : false;
  }
}
