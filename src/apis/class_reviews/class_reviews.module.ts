import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassReviewsResolver } from './class_reviews.resolver';
import { ClassReviewsService } from './class_reviews.service';
import { ClassReview } from './entities/class_review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClassReview, //
    ]),
  ],

  providers: [
    ClassReviewsResolver, //
    ClassReviewsService,
  ],
})
export class ClassReviewsModule {}
