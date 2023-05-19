import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
  IAuthServiceSoicalLogin,
} from './interfaces/auth-service.interface';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, //

    private readonly jwtService: JwtService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async login({ email, pwd, context }: IAuthServiceLogin): Promise<string> {
    const user = await this.usersService.findOneByEmail({ email });

    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    const isAuth = await bcrypt.compare(pwd, user.pwd);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

    this.setRefreshToken({ user, res: context.res, req: context.req });

    return this.getAccessToken({ user });
  }

  async logout({ context }): Promise<string> {
    const accessToken = context.req.headers.authorization.replace(
      'Bearer ',
      '',
    );
    const refreshToken = context.req.headers.cookie.replace(
      'refreshToken=',
      '',
    );

    try {
      const accessVerify: any = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_KEY,
      );
      const refreshVerify: any = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_KEY,
      );

      const accessTtl = accessVerify.exp - accessVerify.iat;
      const refreshTtl = refreshVerify.exp - refreshVerify.iat;
      console.log(accessTtl, refreshTtl);
      await this.cacheManager.set(`accessToken:${accessToken}`, 'accessToken', {
        ttl: accessTtl,
      });

      await this.cacheManager.set(
        `refreshToken:${refreshToken}`,
        'refreshToken',
        {
          ttl: refreshTtl,
        },
      );

      const redisAccess = await this.cacheManager.get(
        `accessToken:${accessToken}`,
      );

      const redisRefresh = await this.cacheManager.get(
        `refreshToken:${refreshToken}`,
      );
      if (redisAccess !== 'accessToken' || redisRefresh !== 'refreshToken')
        throw new UnauthorizedException();

      return '로그아웃에 성공했습니다.';
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async socialLogin({ req, res }: IAuthServiceSoicalLogin) {
    // 1.회원조회
    let user = await this.usersService.findOneByEmail({
      email: req.user.email,
    });
    // 2. 회원가입이 안돼있다면? 자동회원가입
    if (!user) {
      const createUserInput = { ...req.user };
      user = await this.usersService.create({ createUserInput });
    }
    // 3. 회원가입이 돼있다면? 로그인(refreshToken, accessToken 만들어서 브라우저에 전송)
    this.setRefreshToken({ user, res, req });
    res.redirect('http://localhost:3000/mainPage');
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, req, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { id: user.user_id },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' },
    );
    //개발
    // res.setHeader('set-Cookie', `refreshToken=${refreshToken};  path=/;`);

    // 배포
    const originList = [
      'http://localhost:3000',
      'https://happyholidays.site',
      'https://happyholidays-server.site',
    ];

    const origin = req.headers.origin;

    res.setHeader(
      'set-Cookie',
      `refreshToken=${refreshToken};  path=/; domain=.happyholidays-server.site; SameSite=None; Secure; httpOnly;`,
    );

    if (originList.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { id: user.user_id },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '1h' },
    );
  }
}
