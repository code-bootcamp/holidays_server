import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class JwtKaKaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
      scope: ['account_email', 'profile_nickname'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(profile);

    return {
      name: profile.displayName,
      email: profile._json.kakao_account.email,
      phone: 'social',
      pwd: 'social',
      birth_date: 'social',
    };
  }
}
