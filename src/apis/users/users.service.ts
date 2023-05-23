import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  IOAuthUser,
  IUsersServiceCheckPhoneToken,
  IUsersServiceCheckEmailToken,
  IUsersServiceCreate,
  IUsersServiceDelete,
  IUsersServiceDuplicationEmail,
  IUsersServiceFindOneByEmail,
  IUsersServiceFindOneById,
  IUsersServiceSendEmail,
  IUsersServiceSendTokenEmail,
  IUsersServiceSendTokenPhone,
  IUsersServiceUpdate,
  IUsersServiceUpdatePwd,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { getToken } from 'src/commons/utils/util';
import {
  emailCheck,
  sendTokenTemplate,
  welcomeTemplate,
} from 'src/commons/utils/email';
import { Cache } from 'cache-manager';
import { checkPhone } from 'src/commons/utils/phone';
import coolSms from 'coolsms-node-sdk';

const messageService = new coolSms(process.env.SMS_KEY, process.env.SMS_SECRET);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,

    private readonly mailerService: MailerService,
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

    await this.sendEmail({ email, name });

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

  async sendTokenEmail({
    email,
  }: IUsersServiceSendTokenEmail): Promise<string> {
    // 이메일 형식 체크
    emailCheck(email);

    // 이메일 중복 가입 체크
    await this.duplicationEmail({ email });

    const token = getToken();

    await this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: '[홀리데이즈] 인증번호입니다.',
      html: sendTokenTemplate({ token }),
    });
    const myToken = await this.cacheManager.get(email);

    if (myToken) {
      await this.cacheManager.del(email);
    }

    await this.cacheManager.set(email, token, {
      ttl: 180,
    });
    return token;
  }

  async duplicationEmail({
    email,
  }: IUsersServiceDuplicationEmail): Promise<boolean> {
    const user = await this.findOneByEmail({ email });
    if (user) {
      throw new ConflictException('이미 등록된 이메일입니다!!');
    } else {
      return true;
    }
  }

  async checkEmailToken({ email, token }: IUsersServiceCheckEmailToken) {
    const myToken = await this.cacheManager.get(email);
    return myToken === token ? true : false;
  }

  async sendEmail({ email, name }: IUsersServiceSendEmail) {
    await this.mailerService
      .sendMail({
        to: email,
        from: process.env.EMAIL_USER,
        subject: '[홀리데이즈] 가입을 환영합니다.',
        html: welcomeTemplate({ email, name }),
      })
      .catch((error) => {
        throw new UnprocessableEntityException('연결이 원할하지 않습니다!');
      });
    return true;
  }

  async sendTokenPhone({
    phone,
  }: IUsersServiceSendTokenPhone): Promise<string> {
    // 핸드폰 형식 체크
    checkPhone({ phone });

    const token = getToken();

    const result = await messageService.sendOne({
      to: phone,
      from: process.env.SMS_SENDER,
      text: `인증번호는 ${token}입니다`,
      autoTypeDetect: true,
    });
    const myToken = await this.cacheManager.get(phone);

    if (myToken) {
      await this.cacheManager.del(phone);
    }

    await this.cacheManager.set(phone, token, {
      ttl: 180,
    });
    return token;
  }

  async checkPhoneToken({ phone, token }: IUsersServiceCheckPhoneToken) {
    const myToken = await this.cacheManager.get(phone);
    return myToken === token ? true : false;
  }
}
