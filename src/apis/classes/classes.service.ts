import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassSchedulesService } from '../class_schedules/class_schedules.service';
import { ImagesService } from '../images/images.service';
import { FetchClassesPopular } from './dto/fetch-classes-popular.output';
import { FetchClasses } from './dto/fetch-classes.output';
import { Class } from './entities/class.entity';
import coolSms from 'coolsms-node-sdk';

import {
  IClassesServiceCreate,
  IClassesServiceDelete,
  IClassesServiceFindAllByFilter,
  IClassesServiceFindAllByFilterWithAd,
  IClassesServiceFindOneById,
  IClassesServiceUpdate,
  IClassesServiceUpdateIsAd,
} from './interfaces/classes-service.interface';
import { FetchClassesDetail } from './dto/fetch-classes-detail.output';
import { UsersService } from '../users/users.service';

const messageService = new coolSms(process.env.SMS_KEY, process.env.SMS_SECRET);

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classesRepository: Repository<Class>, //

    private readonly classSchedulesService: ClassSchedulesService,

    private readonly imagesService: ImagesService,

    private readonly usersService: UsersService,
  ) {}

  async findAllByFilter({
    category,
    address_category,
    search,
    page,
  }: IClassesServiceFindAllByFilter): Promise<FetchClasses[]> {
    const pageSize = 10;

    const result = await this.classesRepository
      .createQueryBuilder('class')
      .select('*')
      .innerJoin('image', 'i', 'class.class_id = i.class_classId')
      .where('1=1')
      .andWhere('category LIKE "%":category"%"', { category })
      .andWhere('address_category LIKE "%":address_category"%"', {
        address_category,
      })
      .andWhere('title LIKE "%":search"%"', { search })
      .andWhere('i.is_main = 1')
      .orderBy('class.createdAt', 'DESC')
      .limit(pageSize)
      .offset(pageSize * (page - 1))
      .getRawMany();

    return result;
  }

  async findAllByFilterWithPopular({
    category,
    address_category,
    search,
    page,
  }: IClassesServiceFindAllByFilter): Promise<FetchClassesPopular[]> {
    const pageSize = 10;

    const result = await this.classesRepository
      .createQueryBuilder('class')
      .select([
        'class_class_id AS class_id',
        'class.title AS title',
        'class.content_summary AS content_summary',
        'class.price AS price',
        'class.total_time AS total_time',
        'class.address AS address',
        'class.address_detail AS address_detail',
        'i.url AS url',
        'count(w.wishlist_id) AS row_count',
      ])
      .innerJoin('image', 'i', 'class.class_id = i.class_classId')
      .innerJoin('wishlist', 'w', 'class.class_id = w.class_classId')
      .where('1=1')
      .andWhere('category LIKE "%":category"%"', { category })
      .andWhere('address_category LIKE "%":address_category"%"', {
        address_category,
      })
      .andWhere('title LIKE "%":search"%"', { search })
      .andWhere('i.is_main = 1')
      .groupBy('class.class_id')
      .orderBy('row_count', 'DESC')
      .limit(pageSize)
      .offset(pageSize * (page - 1))
      .getRawMany();

    return result;
  }

  async findAllByFilterWithAd({
    category,
    address_category,
    search,
  }: IClassesServiceFindAllByFilterWithAd): Promise<FetchClasses[]> {
    const result = await this.classesRepository
      .createQueryBuilder('class')
      .select('*')
      .innerJoin('image', 'i', 'class.class_id = i.class_classId')
      .where('1=1')
      .andWhere('category LIKE "%":category"%"', { category })
      .andWhere('address_category LIKE "%":address_category"%"', {
        address_category,
      })
      .andWhere('title LIKE "%":search"%"', { search })
      .andWhere('i.is_main = 1')
      .andWhere('is_ad = 1')
      .orderBy('RAND()')
      .limit(2)
      .getRawMany();
    return result;
  }

  async findAllOfMine({ user_id }): Promise<FetchClasses[]> {
    const result = await this.classesRepository
      .createQueryBuilder('class')
      .select('*')
      .innerJoin('image', 'i', 'class.class_id = i.class_classId')
      .innerJoin('user', 'u', 'class.user_userId = u.user_id')
      .where('1=1')
      .andWhere('i.is_main = 1')
      .andWhere('u.user_id = :user_id', { user_id })
      .orderBy('class.createdAt', 'DESC')
      .getRawMany();

    return result;
  }

  async findOneById({ class_id }: IClassesServiceFindOneById): Promise<Class> {
    const result = await this.classesRepository.findOne({
      where: { class_id },
      relations: ['image_', 'user_'],
    });

    return result;
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

  async update({ updateClassInput }: IClassesServiceUpdate): Promise<boolean> {
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

    return result.affected ? true : false;
  }

  async delete({ class_id }: IClassesServiceDelete): Promise<boolean> {
    const result = await this.classesRepository.softDelete({ class_id });

    return result.affected ? true : false;
  }

  async sendClassInquiry({ user_id, class_id, content }): Promise<string> {
    const phone = await this.classesRepository
      .createQueryBuilder('class')
      .select('u.phone')
      .innerJoin('user', 'u', 'class.user_userId = u.user_id')
      .where('1=1')
      .andWhere('class.class_id = :class_id', { class_id })
      .getRawOne();

    const user = await this.usersService.findOneById({ user_id });

    const result = await messageService.sendOne({
      to: phone.u_phone,
      from: process.env.SMS_SENDER,
      text: `${user.name}님에게 문의가 왔습니다 
            문의 내용: ${content}
            ${user.name}님 연락처: ${user.phone}
            `,
      autoTypeDetect: true,
    });

    return '문의 전송 완료!';
  }

  async updateIsAd({ class_id }: IClassesServiceUpdateIsAd): Promise<boolean> {
    const result = await this.classesRepository.update(
      { class_id },
      { is_ad: 1 },
    );

    return result.affected ? true : false;
  }
}
