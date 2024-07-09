import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { JoiValidationPipe } from 'src/common/pipes/joi.pipe';
import { ISignUpUser } from './users.interface';
import { signUpUserValidations } from './users.validations';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('sign-up')
  @UsePipes(new JoiValidationPipe(signUpUserValidations))
  async signUp(@Body() signUpUserDTO: ISignUpUser) {
    const user = await this.userService.signUp(signUpUserDTO);
    return user;
  }
}
