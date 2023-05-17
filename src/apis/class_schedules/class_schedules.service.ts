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

  findAllByClass({ class_id }): Promise<ClassSchedule[]> {
    return this.classSchedulesRepository.find({ where: { class_: class_id } });
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
    const schedule = [];

    for (let i = 0; i < classSchedulesInput.length; i++) {
      this.delete({
        cs_id: classSchedulesInput.cs_id,
      });
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

  async delete({ cs_id }): Promise<boolean> {
    const result = await this.classSchedulesRepository.delete({ cs_id });

    return result.affected ? true : false;
  }
}
