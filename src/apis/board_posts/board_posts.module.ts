import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardPostsResolver } from './board_posts.resolver';
import { BoardPostsService } from './board_posts.service';
import { BoardPost } from './entities/board_post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoardPost, //
    ]),
  ],

  providers: [
    BoardPostsResolver, //
    BoardPostsService,
  ],
})
export class BoardPostsModule {}
