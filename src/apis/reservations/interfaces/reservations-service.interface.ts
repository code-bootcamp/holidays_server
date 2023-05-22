import { CreateReservationInput } from '../dto/create-reservation.input';
import { RESERVATION_STATUS_ENUM } from '../entities/reservation.entity';

export interface IReservationsServiceCreate {
  user_id: string;
  createReservationInput: CreateReservationInput;
  status?: RESERVATION_STATUS_ENUM;
}

export interface IReservationsServiceFindOne {
  res_id: string;
}

export interface IReservationsServiceFindAllByUser {
  user_id: string;
}

export interface IReservationsServiceFindAllByClass {
  class_id: string;
}

export interface IReservationsServiceDelete {
  res_id: string;
}
