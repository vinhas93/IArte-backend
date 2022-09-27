/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { CreateUserService, MyAccountService } from './services';

@Controller()
export class UserController {
  constructor(
    private createUserService: CreateUserService,
    private myAccountService: MyAccountService,
  ) {}

  @Post('/user')
  @ApiOperation({
    summary: 'Create an User.',
  })
  async createUser(@Body() dto: CreateUserDto, @Res() res: Response) {
    const { status, data } = await this.createUserService.execute(dto);
    return res.status(status).send(data);
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Return user profile',
  })
  async myAccount(@LoggedUser() user: UserEntity, @Res() res: Response) {
    const { status, data } = await this.myAccountService.execute(user.id);
    return res.status(status).send(data);
  }
}
