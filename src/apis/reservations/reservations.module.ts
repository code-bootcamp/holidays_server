import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassSchedulesService } from '../class_schedules/class_schedules.service';
import { ClassSchedule } from '../class_schedules/entities/class_schedule.entity';
import { Reservation } from './entities/reservation.entity';
import { ReservationsResolver } from './reservations.reslover';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation, //
      ClassSchedule,
    ]),
  ],

  providers: [
    ReservationsResolver, //
    ReservationsService,
    ClassSchedulesService,
  ],
})
export class ReservationsModule {}
