import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassSchedulesService } from '../class_schedules/class_schedules.service';
import {
  Reservation,
  RESERVATION_STATUS_ENUM,
} from './entities/reservation.entity';
import {
  IReservationsServiceCreate,
  IReservationsServiceDelete,
  IReservationsServiceFindAllByClass,
  IReservationsServiceFindAllByUser,
  IReservationsServiceFindOne,
} from './interfaces/reservations-service.interface';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>, //

    private readonly classSchedulesService: ClassSchedulesService, //
  ) {}

  async findOne({ res_id }: IReservationsServiceFindOne): Promise<Reservation> {
    return await this.reservationsRepository.findOne({
      where: { res_id },
      relations: ['user_', 'class_'],
    });
  }

  findAllByUser({
    user_id,
  }: IReservationsServiceFindAllByUser): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      where: { user_: { user_id } },
      relations: ['user_', 'class_'],
    });
  }

  findAllByClass({
    class_id,
  }: IReservationsServiceFindAllByClass): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      where: { class_: { class_id } },
      relations: ['user_', 'class_'],
    });
  }

  async create({
    user_id,
    createReservationInput,
    status = RESERVATION_STATUS_ENUM.WAITING,
  }: IReservationsServiceCreate): Promise<string> {
    const class_id = createReservationInput.class_id;

    const result = await this.reservationsRepository.save({
      user_: { user_id },
      class_: { class_id },
      ...createReservationInput,
      status,
    });

    return result.res_id;
  }

  async updateStatus({ res_id }): Promise<boolean> {
    const reservation = await this.findOne({ res_id });

    const res_date = reservation.res_date;
    const personnel = reservation.personnel;
    const class_id = reservation.class_.class_id;

    const result = await this.reservationsRepository.update(
      { res_id },
      { status: RESERVATION_STATUS_ENUM.COMPLETE },
    );

    const is_res = result.affected ? true : false;

    await this.classSchedulesService.updateRemain({
      res_date,
      personnel,
      class_id,
    });

    return true;
  }

  async delete({ res_id }: IReservationsServiceDelete): Promise<boolean> {
    const result = await this.reservationsRepository.softDelete({ res_id });

    return result.affected ? true : false;
  }
}
