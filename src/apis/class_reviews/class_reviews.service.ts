import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassReview } from './entities/class_review.entity';

@Injectable()
export class ClassReviewsService {
  constructor(
    @InjectRepository(ClassReview)
    private readonly classReviewsRepository: Repository<ClassReview>, //
  ) {}

  findAllById({ class_id }) {
    return this.classReviewsRepository.find({ where: { class_: class_id } });
  }

  async create({ user_id, createClassReviewInput }) {
    const test = {
      cr_id: 'test',
      content: '테스트',
      grade: 3,
    };

    return test;
  }

  update({ updateClassReviewInput }) {
    const test = {
      cr_id: 'test',
      content: '테스트',
      grade: 3,
    };

    return test;
  }

  async delete({ cr_id }): Promise<boolean> {
    const result = await this.classReviewsRepository.softDelete({ cr_id });

    return result.affected ? true : false;
  }
}
