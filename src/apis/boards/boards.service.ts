import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
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

  findAllByUserId({ user_id }): Promise<Board[]> {
    return this.boardsRepository.find({
      where: { user_: { user_id } },
      relations: ['user_'],
    });
  }

  async create({
    createBoardInput,
    user_id,
  }: IBoardsServiceCreate): Promise<Board> {
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

    return result;
  }

  async update({ updateBoardInput }: IBoardsServiceUpdate): Promise<boolean> {
    const { imageInput, ...boardInput } = updateBoardInput;

    const result = await this.boardsRepository.update(
      { board_id: boardInput.board_id },
      {
        ...boardInput,
      },
    );

    await this.imagesService.bulkInsert({
      imageInput,
      class_: 'null',
      board_: boardInput.board_id,
      magazine_: 'null',
    });

    return result.affected ? true : false;
  }

  async delete({ board_id }): Promise<boolean> {
    const result = await this.boardsRepository.softDelete({ board_id });

    return result.affected ? true : false;
  }

  findAll(): Promise<Board[]> {
    return this.boardsRepository.find({ relations: ['user_'] });
  }

  findOneById({ board_id }): Promise<Board> {
    return this.boardsRepository.findOne({
      where: { board_id },
      relations: ['user_'],
    });
  }
}
