import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { ReservationsResolver } from './reservations.reslover';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation, //
    ]),
  ],

  providers: [
    ReservationsResolver, //
    ReservationsService,
  ],
})
export class ReservationsModule {}
