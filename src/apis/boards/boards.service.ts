import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>, //
  ) {}

  findOneByUserId({ user_id }): Promise<Board[]> {
    return this.boardsRepository.find({ where: { user_: user_id } });
  }

  create({ createBoardInput, user_id }) {
    // return this.boardsRepository.save({
    //   ...createBoardInput,
    // });

    const test = {
      title: '테스트',
      content: '테스트',
    };

    return test;
  }

  async update({ updateBoardInput }): Promise<boolean> {
    const test = true;

    return test;
  }

  async delete({ board_id }): Promise<boolean> {
    const result = await this.boardsRepository.softDelete({ board_id });

    return result.affected ? true : false;
  }

  findAll(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  findOneById({ board_id }): Promise<Board> {
    return this.boardsRepository.findOne({ where: { board_id } });
  }
}
