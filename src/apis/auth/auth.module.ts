import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtGoogleStrategy } from './strategies/jwt-social-google.strategy';
import { JwtKaKaoStrategy } from './strategies/jwt-social-kakao-strategy';
import { JwtNaverStrategy } from './strategies/jwt-social-naver.strategy';

@Module({
  imports: [
    JwtModule.register({}), // 초기 설정도 줄 수 있음
    UsersModule, //
  ],
  providers: [
    AuthResolver, //
    AuthService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtNaverStrategy,
    JwtKaKaoStrategy,
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
