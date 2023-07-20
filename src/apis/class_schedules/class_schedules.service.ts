import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getTodayYYMMDD } from 'src/commons/utils/util';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { ClassSchedule } from './entities/class_schedule.entity';

@Injectable()
export class ClassSchedulesService {
  constructor(
    @InjectRepository(ClassSchedule)
    private readonly classSchedulesRepository: Repository<ClassSchedule>, //
  ) {}

  findAllByClass({ class_id }): Promise<ClassSchedule[]> {
    const sysDate = getTodayYYMMDD();

    return this.classSchedulesRepository.find({
      where: {
        class_: { class_id },
        remain: MoreThanOrEqual(0),
        date: MoreThanOrEqual(sysDate),
      },
      relations: ['class_'],
    });
  }

  async findRemainByClass({ class_id, date }): Promise<number> {
    const result = await this.classSchedulesRepository.findOne({
      where: { class_: { class_id }, date },
      relations: ['class_'],
    });

    return result.remain;
  }

  async create({ classSchedulesInput, class_id }): Promise<string[]> {
    const schedule = [];
    for (let i = 0; i < classSchedulesInput.length; i++) {
      schedule.push({
        date: classSchedulesInput[i].date,
        remain: classSchedulesInput[i].remain,
        class_: class_id,
      });
    }

    const results = await this.classSchedulesRepository.insert(schedule);

    const cs_id = [];
    for (let i = 0; i < results.identifiers.length; i++) {
      cs_id.push(results.identifiers[i].cs_id);
    }
    return cs_id;
  }

  async update({ classSchedulesInput, class_id }): Promise<string[]> {
    const findClass = await this.findAllByClass({ class_id });

    for (let i = 0; i < findClass.length; i++) {
      await this.delete({
        cs_id: findClass[i].cs_id,
      });
    }

    const schedule = [];

    for (let i = 0; i < classSchedulesInput.length; i++) {
      schedule.push({
        date: classSchedulesInput[i].date,
        remain: classSchedulesInput[i].remain,
        class_: class_id,
      });
    }
    const results = await this.classSchedulesRepository.insert(schedule);

    const cs_id = [];
    for (let i = 0; i < results.identifiers.length; i++) {
      cs_id.push(results.identifiers[i].cs_id);
    }
    return cs_id;
  }

  async updateRemain({ res_date, personnel, class_id }) {
    const result = await this.classSchedulesRepository
      .createQueryBuilder('class_schedule')
      .update()
      .set({ remain: () => `remain - ${personnel}` })
      .where('class_classId = :class_id', { class_id })
      .andWhere('date = :res_date', { res_date })
      .execute();
  }

  async delete({ cs_id }): Promise<boolean> {
    const result = await this.classSchedulesRepository.delete({ cs_id });

    return result.affected ? true : false;
  }
}
