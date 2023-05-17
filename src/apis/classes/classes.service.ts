import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassSchedulesService } from '../class_schedules/class_schedules.service';
import { ImagesService } from '../images/images.service';
import { Class } from './entities/class.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classesRepository: Repository<Class>, //

    private readonly classSchedulesService: ClassSchedulesService,

    private readonly imagesService: ImagesService,
  ) {}

  findAllByFilter({ category, address_category, search }): Promise<Class[]> {
    return this.classesRepository.find();
  }

  findAllByFilterWithAd({
    category,
    address_category,
    search,
  }): Promise<Class[]> {
    return this.classesRepository.find();
  }

  findOneById({ user_id, class_id }): Promise<Class> {
    return this.classesRepository.findOne({ where: { class_id } });
  }

  async create({ createClassInput, user_id }) {
    const { classSchedulesInput, imageInput, ...classInput } = createClassInput;

    const result = await this.classesRepository.save({
      ...classInput,
      user_: user_id,
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

  update({ updateClassInput, user_id }) {
    const test = {
      title: '테스트',
      content_summary: '테스트',
      price: 10000,
      class_mNum: 15,
      address: '서울시 구로구',
      address_detail: '코드캠프 3층',
      category: '여가',
      total_time: '120분',
      content: '테스트',
      url: ['테스트', '테스트2'],
      type: [1, 2],
      is_main: [1, 2],
      date: ['5/8', '5/9'], // 일정
      reamin: [10, 11], // 남은인원
    };

    return test;
  }

  async delete({ class_id }): Promise<boolean> {
    const result = await this.classesRepository.softDelete({ class_id });

    return result.affected ? true : false;
  }

  async sendClassInquiry({ user_id, class_id, content }): Promise<string> {
    return await '문의 전송 완료!';
  }
}
