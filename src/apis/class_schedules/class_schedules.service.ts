import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassSchedule } from './entities/class_schedule.entity';

@Injectable()
export class ClassSchedulesService {
  constructor(
    @InjectRepository(ClassSchedule)
    private readonly classSchedulesRepository: Repository<ClassSchedule>, //
  ) {}

  findAllByUser({ class_id }): Promise<ClassSchedule[]> {
    return this.classSchedulesRepository.find({ where: { class_: class_id } });
  }

  async create({ classSchedulesInput, class_id }): Promise<string> {
    const schedule = [];
    for (let i = 0; i < classSchedulesInput.length; i++) {
      schedule.push({
        date: classSchedulesInput[i].date,
        remain: classSchedulesInput[i].remain,
        class_id,
      });

      const results = await this.classSchedulesRepository.insert(schedule);

      return 'dd';
    }

    await this.classSchedulesRepository.save({});
  }

  async update({ updateClassScheduleInput }): Promise<boolean> {
    return await true;
  }

  async delete({ cs_id }): Promise<boolean> {
    const result = await this.classSchedulesRepository.softDelete({ cs_id });

    return result.affected ? true : false;
  }
}
