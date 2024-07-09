import { Injectable } from '@nestjs/common';
import { ISignUpUser, UsersError } from './users.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { LoggingService } from 'src/logging/logging.service';
import { ILoginUser } from 'src/auth/auth.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersEntity: Repository<UsersEntity>,
    private loggingService: LoggingService,
  ) {}

  async signUp(payload: ISignUpUser) {
    try {
      const response = await this.usersEntity.count({
        where: { email: payload.email },
      });
      if (response) throw new Error(UsersError.USER_ALREADY_EXISTS);
      const user = await this.usersEntity.save(payload);
      return user;
    } catch (err) {
      this.loggingService.logError(err.message, err);
      throw err;
    }
  }

  async getUser(payload: ILoginUser): Promise<UsersEntity> {
    try {
      const response = await this.usersEntity.findOne({
        where: { email: payload.email },
      });

      if (!response) {
        throw new Error(UsersError.USER_NOT_FOUND);
      }
      return response;
    } catch (err) {
      this.loggingService.logError(err.message, err);
      throw err;
    }
  }

  async verifyPassword(payload: ILoginUser) {
    try {
      const user = await this.getUser(payload);
      if (payload.password === user.password) {
        return true;
      }
      throw new Error(UsersError.PASSWORD_IS_INCORRECT);
    } catch (err) {
      this.loggingService.logError(err.message, err);
      throw err;
    }
  }
}
