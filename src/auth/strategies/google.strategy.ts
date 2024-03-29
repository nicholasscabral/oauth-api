import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { GoogleOAuthUser } from 'src/common/interfaces/oauth';
import { config } from 'src/config/config';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super(config.oauth.google);
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const user: GoogleOAuthUser = {
      email: profile.emails[0].value,
      name: profile.displayName,
      picture: profile.photos[0].value,
      sub: profile.id,
      accessToken,
    };
    console.log('google', { user });
    done(null, user);
  }
}
