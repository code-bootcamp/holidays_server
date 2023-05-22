import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  }: IClassReviewsServiceFindAllById): Promise<ClassReview[]> {
    return this.classReviewsRepository.find({
      where: { class_: { class_id } },
      relations: ['user_', 'class_'],
    });
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
