import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { FetchBoards } from './dto/fetch-classes.output';
import { Board } from './entities/board.entity';
import {
  IBoardsServiceCreate,
  IBoardsServiceFindAll,
  IBoardsServiceUpdate,
} from './interfaces/boards-service.interface';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>, //

    private readonly imagesService: ImagesService,
  ) {}

  async findAllByUserId({ user_id }): Promise<FetchBoards[]> {
    const result = await this.boardsRepository
      .createQueryBuilder('board')
      .select('*')
      .innerJoin('image', 'i', 'i.board_boardId = board.board_id')
      .innerJoin('user', 'u', 'u.user_id = board.user_userId')
      .where('i.is_main = 1')
      .andWhere('board.user_userId = :user_id', { user_id })
      .getRawMany();

    return result;
  }

  async create({
    createBoardInput,
    user_id,
  }: IBoardsServiceCreate): Promise<string> {
    const { imageInput, ...boardInput } = createBoardInput;
    console.log('ddd');
    console.log(createBoardInput);
    console.log(imageInput);
    console.log('ddd');

    const result = await this.boardsRepository.save({
      ...boardInput,
      user_: { user_id },
    });
    if (imageInput) {
      await this.imagesService.bulkInsert({
        imageInput,
        class_: 'null',
        board_: result.board_id,
        magazine_: 'null',
      });
    }

    console.log(result);

    return result.board_id;
  }

  async update({ updateBoardInput }: IBoardsServiceUpdate): Promise<string> {
    const { imageInput, ...boardInput } = updateBoardInput;

    const result = await this.boardsRepository.update(
      { board_id: boardInput.board_id },
      {
        ...boardInput,
      },
    );

    if (imageInput) {
      await this.imagesService.update({
        imageInput,
        class_: 'null',
        board_: boardInput.board_id,
        magazine_: 'null',
      });
    }

    console.log('여기 오니?');
    // return result.affected ? true : false;

    return boardInput.board_id;
  }

  async delete({ board_id }): Promise<boolean> {
    const result = await this.boardsRepository.softDelete({ board_id });

    return result.affected ? true : false;
  }

  async findAllPage({ page }): Promise<FetchBoards[]> {
    const pageSize = 10;

    const result = await this.boardsRepository
      .createQueryBuilder('board')
      .select([
        'board.board_id AS board_id',
        'board.title AS title',
        'board.createdAt AS createdAt',
        'board.content AS content',
        'i.url AS url',
        'u.name AS name',
        'count(bp.bp_id) AS row_count',
      ])
      .innerJoin('image', 'i', 'i.board_boardId = board.board_id')
      .innerJoin('user', 'u', 'u.user_id = board.user_userId')
      .leftJoin('board_post', 'bp', 'board.board_id = bp.board_boardId')
      .where('i.is_main = 1')
      .groupBy('board_id, title, createdAt, content, url, name')
      .orderBy('board.createdAt', 'DESC')
      .limit(pageSize)
      .offset(pageSize * (page - 1))
      .getRawMany();

    console.log(result);

    return result;
  }

  async findAll({ createdAt }: IBoardsServiceFindAll): Promise<FetchBoards[]> {
    const result = await this.boardsRepository
      .createQueryBuilder('board')
      .select([
        'board.board_id AS board_id',
        'board.title AS title',
        'board.createdAt AS createdAt',
        'board.content AS content',
        'i.url AS url',
        'u.name AS name',
        'count(bp.bp_id) AS row_count',
      ])
      .innerJoin('image', 'i', 'i.board_boardId = board.board_id')
      .innerJoin('user', 'u', 'u.user_id = board.user_userId')
      .leftJoin('board_post', 'bp', 'board.board_id = bp.board_boardId')
      .where('i.is_main = 1')
      .andWhere('board.createdAt > :createdAt', { createdAt })
      .groupBy('board_id, title, createdAt, content, url, name')
      .orderBy('row_count', 'DESC')
      .limit(3)
      .getRawMany();

    console.log(result);

    return result;
  }

  findOneById({ board_id }): Promise<Board> {
    return this.boardsRepository.findOne({
      where: { board_id },
      relations: ['user_', 'image_', 'bp_'],
    });
  }
}
