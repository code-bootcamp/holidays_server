import { Response, Request } from 'express';
import { User } from 'src/apis/users/entities/user.entity';
import { IOAuthUser } from 'src/apis/users/interfaces/users-service.interface';
import { IAuthUser, IContext } from 'src/commons/interfaces/context';

export interface IAuthServiceLogin {
  email: string;

  pwd: string;

  context: IContext;
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
  req: Request;
}

export interface IAuthServiceRestoreAccessToken {
  user: IAuthUser['user'];
}

export interface IAuthServiceSoicalLogin {
  req: Request & IOAuthUser;
  res: Response;
}
