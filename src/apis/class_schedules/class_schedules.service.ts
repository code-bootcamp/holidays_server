import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassSchedule } from './entities/class_schedule.entity';

@Injectable()
export class ClassSchedulesService {
  constructor(
    @InjectRepository(ClassSchedule)
    private readonly reservationsRepository: Repository<ClassSchedule>, //
  ) {}

  findAllByUser({ class_id }): Promise<ClassSchedule[]> {
    return this.reservationsRepository.find({ where: { class_: class_id } });
  }

  async create({ createClassScheduleInput }): Promise<string> {
    return await '예약 승인!';
  }

  async update({ updateClassScheduleInput }): Promise<boolean> {
    return await true;
  }

  async delete({ cs_id }): Promise<boolean> {
    const result = await this.reservationsRepository.softDelete({ cs_id });

    return result.affected ? true : false;
  }
}
