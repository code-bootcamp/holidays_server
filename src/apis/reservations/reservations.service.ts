import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>, //
  ) {}

  findAllByUser({ user_id }): Promise<Reservation[]> {
    return this.reservationsRepository.find({ where: { user_: user_id } });
  }

  findAllByClass({ class_id }): Promise<Reservation[]> {
    return this.reservationsRepository.find({ where: { class_: class_id } });
  }

  async create({ user_id, createReservationInput }): Promise<string> {
    return await '예약 승인!';
  }

  async delete({ res_id }): Promise<boolean> {
    const result = await this.reservationsRepository.softDelete({ res_id });

    return result.affected ? true : false;
  }
}
