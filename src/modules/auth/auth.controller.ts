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
import { UserEntity } from '../user/entity/user.entity';
import { AuthService } from './auth.service';
import { LoggedUser } from './decorator/logged-user.decorator';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in-user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving a validation token.',
  })
  LoginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.LoginUser(loginUserDto);
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
