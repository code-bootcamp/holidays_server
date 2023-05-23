import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FetchClassReviews } from './dto/fetch-classReviews.output';
import { ClassReview } from './entities/class_review.entity';
import {
  IClassReviewsServiceCreate,
  IClassReviewsServiceFindAllById,
  IClassReviewsServiceUpdate,
} from './interfaces/class_reviews-service.interface';

@Injectable()
export class ClassReviewsService {
  constructor(
    @InjectRepository(ClassReview)
    private readonly classReviewsRepository: Repository<ClassReview>, //
  ) {}

  findAllById({
    class_id,
    page,
  }: IClassReviewsServiceFindAllById): Promise<FetchClassReviews[]> {
    const pageSize = 5;

    const result = this.classReviewsRepository
      .createQueryBuilder('class_review')
      .select([
        'u.name AS name',
        'class_review.cr_id AS cr_id',
        'class_review.grade AS grade',
        'class_review.content AS content',
        'class_review.createdAt AS createdAt',
      ])
      .innerJoin('user', 'u', 'u.user_id = class_review.user_userId')
      .where('class_review.class_classId = :class_id', { class_id })
      .orderBy('class_review.createdAt', 'DESC')
      .limit(pageSize)
      .offset(pageSize * (page - 1))
      .getRawMany();

    return result;
  }

  async create({
    user_id,
    createClassReviewInput,
  }: IClassReviewsServiceCreate): Promise<string> {
    const class_id = createClassReviewInput.class_id;
    const result = await this.classReviewsRepository.save({
      class_: { class_id },
      user_: { user_id },
      ...createClassReviewInput,
    });

    return result.cr_id;
  }

  async update({
    updateClassReviewInput,
  }: IClassReviewsServiceUpdate): Promise<boolean> {
    const cr_id = updateClassReviewInput.cr_id;

    const result = await this.classReviewsRepository.update(
      { cr_id },
      { ...updateClassReviewInput },
    );

    return result.affected ? true : false;
  }

  async delete({ cr_id }): Promise<boolean> {
    const result = await this.classReviewsRepository.delete({ cr_id });

    return result.affected ? true : false;
  }
}
