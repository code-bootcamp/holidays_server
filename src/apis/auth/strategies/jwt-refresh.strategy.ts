import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie; // refreshToken=abcdefg
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: process.env.JWT_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    try {
      const refreshToken = req.headers.cookie.replace('refreshToken=', '');

      const redisRefresh = await this.cacheManager.get(
        `refreshToken:${refreshToken}`,
      );
      if (redisRefresh === 'refreshToken') throw new UnauthorizedException();
      return {
        user_id: payload.id,
      };
    } catch (error) {
      throw error;
    }
  }
}
