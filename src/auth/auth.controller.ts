import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { loginUserValidations, validateUserValidations } from './auth.validations';
import { JoiValidationPipe } from 'src/common/pipes/joi.pipe';
import { ILoginUser, IValidateUser } from './auth.interface';
import { AuthService } from './auth.service';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new JoiValidationPipe(loginUserValidations))
  async login(@Body() loginUserDto: ILoginUser) {
    const task = await this.authService.login(loginUserDto);
    return task;
  }

  @Post('verify')
  @UsePipes(new JoiValidationPipe(validateUserValidations))
  async verify(@Body() validateUserDto: IValidateUser) {
    const task = await this.authService.validate(validateUserDto);
    return task;
  }
}
