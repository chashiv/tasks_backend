import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthErrors } from './auth.interface';
import { UsersError } from 'src/users/users.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(AuthErrors.INVALID_TOKEN);
    }

    const token = authHeader.split(' ')[1];
    let decoded;

    try {
      decoded = this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException(e);
    }

    const user = await this.userService.getUser({ email: decoded?.email, password: decoded?.password });
    if (!user) {
      throw new UnauthorizedException(UsersError.USER_NOT_FOUND);
    }

    req.headers.userId = user.id;
    next();
  }
}
