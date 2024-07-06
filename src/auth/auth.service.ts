import { Injectable } from '@nestjs/common';
import { ILoginUser, IValidateUser } from './auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtServce: JwtService) {}

  async login(user: ILoginUser) {
    const payload = { username: user.username, password: user.password };
    return {
      access_token: this.jwtServce.sign(payload),
    };
  }

  async validate(payload: IValidateUser) {
    return this.jwtServce.verify(payload.token);
  }
}
