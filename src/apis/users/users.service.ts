import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  IOAuthUser,
  IUsersServiceCreate,
  IUsersServiceDelete,
  IUsersServiceFindOneByEmail,
  IUsersServiceFindOneById,
  IUsersServiceUpdate,
  IUsersServiceUpdatePwd,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, //
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByPhone({ phone }): Promise<User> {
    return this.usersRepository.findOne({ where: { phone } });
  }

  findOneById({ user_id }: IUsersServiceFindOneById): Promise<User> {
    return this.usersRepository.findOne({ where: { user_id } });
  }

  findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create({ createUserInput }: IUsersServiceCreate): Promise<User> {
    const { email, birth_date, name, phone, pwd } = createUserInput;
    const user = await this.findOneByEmail({
      email,
    });

    if (user) throw new ConflictException('이미 등록된 이메일입니다.');

    const hashedPassword = await bcrypt.hash(pwd, 10);
    return this.usersRepository.save({
      email,
      pwd: hashedPassword,
      birth_date,
      phone,
      name,
      type: 1,
    });
  }

  async update({
    user_id,
    updateUserInput,
  }: IUsersServiceUpdate): Promise<User> {
    const user = await this.findOneById({ user_id });

    const result = await this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });

    return result;
  }

  async updatePwd({ user_id, pwd }: IUsersServiceUpdatePwd): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(pwd, 10);
    const result = await this.usersRepository.update(
      { user_id },
      { pwd: hashedPassword },
    );
    // this.productsRepository.update({조건}, {수정할내용}) =>  결과를 객체로 못 돌려 받는 수정 방법
    return result.affected ? true : false;
  }

  async delete({ user_id }: IUsersServiceDelete): Promise<boolean> {
    const result = await this.usersRepository.softDelete({
      user_id,
    });
    return result.affected ? true : false;
  }
}
