import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { MailService } from '../mails/mail.service';
import { UserEntity } from '../user/entity/user.entity';
import { AuthService } from './auth.service';
import { LoggedUser } from './decorator/logged-user.decorator';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, // private mailService: MailService,
  ) {}

  @Post('/sign-in-user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving a validation token.',
  })
  LoginUser(@Body() loginUserDto: LoginUserDto) {
    // return this.mailService.sendDoubleAuthentication(loginUserDto)
    return this.authService.LoginUser(loginUserDto); // teríamos que mudar para envio de e-mail e no e-mail enviar o token
  }

  @Get('/user-logged')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Return user authentication now.',
  })
  Auth(@LoggedUser() user: UserEntity) {
    return user;
  }
}
