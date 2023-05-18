import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassSchedulesService } from '../class_schedules/class_schedules.service';
import { ImagesService } from '../images/images.service';
import { Class } from './entities/class.entity';
import {
  IClassesServiceCreate,
  IClassesServiceDelete,
  IClassesServiceFindAllByFilter,
  IClassesServiceFindAllByFilterWithAd,
  IClassesServiceFindOneById,
  IClassesServiceUpdate,
  IClassesServiceUpdateIsAd,
} from './interfaces/classes-service.interface';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classesRepository: Repository<Class>, //

    private readonly classSchedulesService: ClassSchedulesService,

    private readonly imagesService: ImagesService,
  ) {}

  async findAllByFilter({
    category,
    address_category,
    search,
  }: IClassesServiceFindAllByFilter): Promise<Class[]> {
    const result = await this.classesRepository
      .createQueryBuilder('class')
      .select('*')
      .where('1=1')
      .andWhere('category LIKE "%":category"%"', { category })
      .andWhere('address_category LIKE "%":address_category"%"', {
        address_category,
      })
      .andWhere('title LIKE "%":search"%"', { search })
      .orderBy('class.createdAt')
      .getRawMany();

    return result;
  }

  async findAllByFilterWithAd({
    category,
    address_category,
    search,
  }: IClassesServiceFindAllByFilterWithAd): Promise<Class[]> {
    const result = await this.classesRepository
      .createQueryBuilder('class')
      .select('*')
      .where('1=1')
      .andWhere('category LIKE "%":category"%"', { category })
      .andWhere('address_category LIKE "%":address_category"%"', {
        address_category,
      })
      .andWhere('title LIKE "%":search"%"', { search })
      .andWhere('is_ad = 1')
      .orderBy('class.createdAt')
      .getRawMany();
    return result;
  }

  findOneById({ class_id }: IClassesServiceFindOneById): Promise<Class> {
    return this.classesRepository.findOne({
      where: { class_id },
      relations: ['user_'],
    });
  }

  async create({
    createClassInput,
    user_id,
  }: IClassesServiceCreate): Promise<Class> {
    const { classSchedulesInput, imageInput, ...classInput } = createClassInput;

    const result = await this.classesRepository.save({
      ...classInput,
      user_: { user_id },
    });

    const csResult = await this.classSchedulesService.create({
      classSchedulesInput,
      class_id: result.class_id,
    });

    await this.imagesService.bulkInsert({
      imageInput,
      class_: result.class_id,
      board_: 'null',
      magazine_: 'null',
    });

    return result;
  }

  async update({ updateClassInput }: IClassesServiceUpdate) {
    const { classSchedulesInput, imageInput, ...classInput } = updateClassInput;

    const result = await this.classesRepository.update(
      { class_id: classInput.class_id },
      {
        ...classInput,
      },
    );

    const csResult = await this.classSchedulesService.update({
      classSchedulesInput,
      class_id: classInput.class_id,
    });

    await this.imagesService.update({
      imageInput,
      class_: classInput.class_id,
      board_: 'null',
      magazine_: 'null',
    });

    return result;
  }

  async delete({ class_id }: IClassesServiceDelete): Promise<boolean> {
    const result = await this.classesRepository.softDelete({ class_id });

    return result.affected ? true : false;
  }

  async sendClassInquiry({ user_id, class_id, content }): Promise<string> {
    return await '문의 전송 완료!';
  }

  async updateIsAd({ class_id }: IClassesServiceUpdateIsAd): Promise<boolean> {
    const result = await this.classesRepository.update(
      { class_id },
      { is_ad: 1 },
    );

    return result.affected ? true : false;
  }
}
