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
  user_id: string;
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
