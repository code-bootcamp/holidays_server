import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Board, //
      Image,
    ]),
  ],

  providers: [
    BoardsResolver, //
    BoardsService,
    ImagesService,
  ],

  //   exports: [
  //     BoardsService, //
  //   ],
})
export class BoardsModule {}
