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
  IReservationsServiceSendReservation,
  IReservationsServiceSendReservationComplete,
  IReservationsServiceUpdateStatus,
} from './interfaces/reservations-service.interface';
import coolSms from 'coolsms-node-sdk';
import { FetchReservationsOfClass } from './dto/fetch-reservationOfClass.output';
import { FetchReservationsOfUser } from './dto/fetch-reservationOfUser.output';

const messageService = new coolSms(process.env.SMS_KEY, process.env.SMS_SECRET);

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

  async findAllByUser({
    user_id,
  }: IReservationsServiceFindAllByUser): Promise<FetchReservationsOfUser[]> {
    const result = await this.reservationsRepository
      .createQueryBuilder('reservation')
      .select([
        'reservation.res_id AS res_id',
        'u.name AS name',
        'c.title AS title',
        'reservation.res_date AS date',
        'reservation.personnel AS personnel',
        'reservation.status AS status',
        'c.class_id AS class_id',
        'i.url AS url',
      ])
      .innerJoin('class', 'c', 'c.class_id = reservation.class_classId')
      .innerJoin('user', 'u', 'u.user_id = reservation.user_userId')
      .innerJoin('image', 'i', 'i.class_classId = reservation.class_classId')
      .where('1=1')
      .andWhere('reservation.user_userId = :user_id', { user_id })
      .andWhere('i.is_main = 1')
      .getRawMany();

    return result;
  }

  async findAllByClass({
    user_id,
  }: IReservationsServiceFindAllByClass): Promise<FetchReservationsOfClass[]> {
    const result = await this.reservationsRepository
      .createQueryBuilder('reservation')
      .select([
        'reservation.res_id AS res_id',
        'u.name AS name',
        'c.title AS title',
        'reservation.res_date AS date',
        'reservation.personnel AS personnel',
        'c.class_id AS class_id',
        'i.url AS url',
      ])
      .innerJoin('class', 'c', 'c.class_id = reservation.class_classId')
      .innerJoin('user', 'u', 'u.user_id = reservation.user_userId')
      .innerJoin('image', 'i', 'i.class_classId = reservation.class_classId')
      .where('1=1')
      .andWhere('reservation.status = "WAITING"')
      .andWhere('c.user_userId = :user_id', { user_id })
      .andWhere('i.is_main = 1')
      .getRawMany();

    for (let i = 0; i < result.length; i++) {
      result[i].remain = await this.classSchedulesService.findRemainByClass({
        class_id: result[i].class_id,
        date: result[i].date,
      });
    }

    return result;
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

    await this.sendReservation({ class_id });

    return result.res_id;
  }

  async updateStatus({
    res_id,
  }: IReservationsServiceUpdateStatus): Promise<boolean> {
    const reservation = await this.findOne({ res_id });

    const res_date = reservation.res_date;
    const user_id = reservation.user_.user_id;
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

    await this.sendReservationComplete({ user_id });

    return true;
  }

  async sendReservation({
    class_id,
  }: IReservationsServiceSendReservation): Promise<string> {
    const user_class = await this.reservationsRepository
      .createQueryBuilder('reservation')
      .select(['u.phone AS phone', 'c.title AS title'])
      .innerJoin('class', 'c', 'c.class_id = reservation.class_classId')
      .innerJoin('user', 'u', 'c.user_userId = u.user_id')
      .where('1=1')
      .andWhere('c.class_id = :class_id', { class_id })
      .getRawOne();

    const result = await messageService.sendOne({
      to: user_class.phone,
      from: process.env.SMS_SENDER,
      text: `${user_class.title}클래스에 예약신청이 왔습니다 
            입금 확인 후 예약 승인을 눌러주세요!
            `,
      autoTypeDetect: true,
    });

    return '문자 전송 완료!';
  }

  async sendReservationComplete({
    user_id,
  }: IReservationsServiceSendReservationComplete): Promise<string> {
    const user_class = await this.reservationsRepository
      .createQueryBuilder('reservation')
      .select(['u.phone AS phone', 'c.title AS title'])
      .innerJoin('class', 'c', 'c.class_id = reservation.class_classId')
      .innerJoin('user', 'u', 'reservation.user_userId = u.user_id')
      .where('1=1')
      .andWhere('u.user_id = :user_id', { user_id })
      .getRawOne();

    const result = await messageService.sendOne({
      to: user_class.phone,
      from: process.env.SMS_SENDER,
      text: `${user_class.title} 클래스 예약이 완료되었습니다!`,
      autoTypeDetect: true,
    });

    return '문자 전송 완료!';
  }

  async delete({ res_id }: IReservationsServiceDelete): Promise<boolean> {
    const result = await this.reservationsRepository.delete({ res_id });

    return result.affected ? true : false;
  }
}
