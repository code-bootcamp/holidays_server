import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { FetchBoards } from './dto/fetch-classes.output';
import { Board } from './entities/board.entity';
import {
  IBoardsServiceCreate,
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

    const result = await this.boardsRepository.save({
      ...boardInput,
      user_: { user_id },
    });

    await this.imagesService.bulkInsert({
      imageInput,
      class_: 'null',
      board_: result.board_id,
      magazine_: 'null',
    });

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

    await this.imagesService.update({
      imageInput,
      class_: 'null',
      board_: boardInput.board_id,
      magazine_: 'null',
    });

    // return result.affected ? true : false;

    return boardInput.board_id;
  }

  async delete({ board_id }): Promise<boolean> {
    const result = await this.boardsRepository.softDelete({ board_id });

    return result.affected ? true : false;
  }

  async findAll({ page }): Promise<FetchBoards[]> {
    const pageSize = 10;

    const result = await this.boardsRepository
      .createQueryBuilder('board')
      .select('*')
      .innerJoin('image', 'i', 'i.board_boardId = board.board_id')
      .innerJoin('user', 'u', 'u.user_id = board.user_userId')
      .where('i.is_main = 1')
      .orderBy('board.createdAt', 'DESC')
      .limit(pageSize)
      .offset(pageSize * (page - 1))
      .getRawMany();

    console.log(result);

    return result;
  }

  findOneById({ board_id }): Promise<Board> {
    return this.boardsRepository.findOne({
      where: { board_id },
      relations: ['user_', 'image_'],
    });
  }
}
