import { Injectable } from '@nestjs/common';
import { ILoginUser, IValidateUser } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtServce: JwtService,
    private userService: UsersService,
  ) {}

  async login(user: ILoginUser) {
    const payload = { email: user.email, password: user.password };
    if (await this.userService.verifyPassword(user)) {
      return {
        access_token: this.jwtServce.sign(payload),
      };
    }
  }

  async validate(payload: IValidateUser) {
    return this.jwtServce.verify(payload.token);
  }
}
