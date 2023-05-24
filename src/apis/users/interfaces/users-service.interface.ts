import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

export interface IUsersServiceCreate {
  createUserInput: CreateUserInput;
}

export interface IUsersServiceUpdate {
  user_id: string;
  updateUserInput: UpdateUserInput;
}

export interface IUsersServiceUpdatePwd {
  email: string;
  pwd: string;
}

export interface IUsersServiceFindOneByEmail {
  email: string;
}

export interface IUsersServiceFindOneById {
  user_id: string;
}

export interface IUsersServiceDelete {
  user_id: string;
}

export interface IOAuthUser {
  user: {
    name: string;
    email: string;
    birth_date: string;
    phone: string;
    pwd: string;
  };
}

export interface IUsersServiceSendTokenEmail {
  email: string;
}

export interface IUsersServiceDuplicationEmail {
  email: string;
}

export interface IUsersServiceCheckEmailToken {
  email: string;
  token: string;
}

export interface IUsersServiceSendEmail {
  email: string;
  name: string;
}

export interface IUsersServiceSendTokenPhone {
  phone: string;
}

export interface IUsersServiceCheckPhoneToken {
  phone: string;
  token: string;
}
