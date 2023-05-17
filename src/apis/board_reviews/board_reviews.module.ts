import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardReviewsResolver } from './board_reviews.resolver';
import { BoardReviewsService } from './board_reviews.service';
import { BoardReview } from './entities/board_review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoardReview, //
    ]),
  ],

  providers: [
    BoardReviewsResolver, //
    BoardReviewsService,
  ],
})
export class BoardReviewsModule {}
