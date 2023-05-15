import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassSchedulesResolver } from './class_schedules.resolver';
import { ClassSchedulesService } from './class_schedules.service';
import { ClassSchedule } from './entities/class_schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClassSchedule, //
    ]),
  ],

  providers: [
    ClassSchedulesResolver, //
    ClassSchedulesService,
  ],
})
export class ClassSchedulesModule {}
