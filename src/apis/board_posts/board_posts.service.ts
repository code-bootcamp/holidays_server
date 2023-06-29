import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FetchBoardPosts } from './dto/fetch-boardPosts.output';
import { BoardPost } from './entities/board_post.entity';
import {
  IBoardPostsServiceCreate,
  IBoardPostsServiceDelete,
  IBoardPostsServiceFindOneByUserId,
} from './interfaces/board_posts-service.interface';

@Injectable()
export class BoardPostsService {
  constructor(
    @InjectRepository(BoardPost)
    private readonly boardPostsRepository: Repository<BoardPost>, //
  ) {}

  async findAllByUserId({
    user_id,
  }: IBoardPostsServiceFindOneByUserId): Promise<FetchBoardPosts[]> {
    const result = await this.boardPostsRepository
      .createQueryBuilder('boardPost')
      .select(['b.board_id AS board_id', 'b.title AS title', 'i.url AS url'])
      .innerJoin('board', 'b', 'b.board_id = boardPost.board_boardId')
      .innerJoin('image', 'i', 'b.board_id = i.board_boardId')
      .where('1=1')
      .andWhere('boardPost.user_userId = :user_id', { user_id })
      .andWhere('i.is_main = 1')
      .getRawMany();

    return result;
  }

  async findOneByUserId({ board_id, user_id }): Promise<string> {
    const result = await this.boardPostsRepository
      .createQueryBuilder('boardPost')
      .select('bp_id')
      .where('user_userId = :user_id', { user_id })
      .andWhere('board_boardId = :board_id', { board_id })
      .getRawOne();

    return result;
  }

  async create({
    user_id,
    board_id,
  }: IBoardPostsServiceCreate): Promise<boolean> {
    const is_post = await this.findOneByUserId({ board_id, user_id });

    if (is_post) {
      await this.delete({ board_id, user_id });
      return false;
    } else {
      await this.boardPostsRepository.save({
        user_: { user_id },
        board_: { board_id },
      });
      return true;
    }
  }

  async delete({
    board_id,
    user_id,
  }: IBoardPostsServiceDelete): Promise<boolean> {
    const result = await this.boardPostsRepository
      .createQueryBuilder('boardPost')
      .delete()
      .where('user_userId = :user_id', { user_id })
      .andWhere('board_boardId = :board_id', { board_id })
      .execute();

    return result.affected ? true : false;
  }
}
