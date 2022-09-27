/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserService } from './services';

@Controller()
export class UserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto, @Res() res: Response) {
    const { status, data } = await this.createUserService.execute(dto);
    return res.status(status).send(data);
  }

  @Get()
  async myAccount() {}
}
