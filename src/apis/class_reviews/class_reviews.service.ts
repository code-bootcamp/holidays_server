import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassReview } from './entities/class_review.entity';
import {
  IClassReviewsServiceCreate,
  IClassReviewsServiceUpdate,
} from './interfaces/class_reviews-service.interface';

@Injectable()
export class ClassReviewsService {
  constructor(
    @InjectRepository(ClassReview)
    private readonly classReviewsRepository: Repository<ClassReview>, //
  ) {}

  findAllById({ class_id }) {
    return this.classReviewsRepository.find({
      where: { class_: { class_id } },
      relations: ['user_', 'class_'],
    });
  }

  async create({
    user_id,
    createClassReviewInput,
  }: IClassReviewsServiceCreate): Promise<boolean> {
    const result = await this.classReviewsRepository.save({
      user_: { user_id },
      ...createClassReviewInput,
    });

    if (result.cr_id) return true;
    else return false;
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
