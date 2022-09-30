/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoggedManager } from '../auth/decorator/logged-manager.decorator';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateMyAccountDto } from './dto/update-my-account.dto';
import { UpdateMyPasswordDto } from './dto/update-my-password.dto';
import { UserEntity } from './entity/user.entity';
import {
  CreateUserService,
  DeleteMyAccountService,
  MyAccountService,
  UpdateMyAccountService,
  UpdateMyPasswordService,
} from './services';

@ApiTags()
@Controller()
export class UserController {
  constructor(
    private createUserService: CreateUserService,
    private myAccountService: MyAccountService,
    private updateMyPasswordService: UpdateMyPasswordService,
    private updateMyAccountService: UpdateMyAccountService,
    private deleteMyAccountService: DeleteMyAccountService,
  ) {}

  // ============================ Permissões LoggedManager ==========================

  @ApiTags('Just Manager')
  @Post('/admin/create-user') //Owner ou Manager Criam usuários
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create an User.',
  })
  async createUser(
    @LoggedManager() user: UserEntity,
    @Body() dto: CreateUserDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.createUserService.execute(dto);
    return res.status(status).send(data);
  }

<<<<<<< HEAD
  @Get()
  async myAccount() {}
=======
  // ============================ Permissões LoggedUser ==========================

  @ApiTags('My account')
  @Get('/my-account') //Perfil de quem está logado
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Return logged user`s profile.',
  })
  async myAccount(@LoggedUser() user: UserEntity, @Res() res: Response) {
    const { status, data } = await this.myAccountService.execute(user.id);
    return res.status(status).send(data);
  }

  @ApiTags('My account')
  @Put('/my-account') //Update Password
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Upddates logged User`s password.',
  })
  async updateMyPassword(
    @LoggedUser() user: UserEntity,
    @Body() dto: UpdateMyPasswordDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.updateMyPasswordService.execute(
      dto,
      user.id,
    );
    return res.status(status).send(data);
  }

  @ApiTags('My account')
  @Patch('/my-account') //Update nome ou imagem da conta
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Upddates logged User`s name or image.',
  })
  async updateMyAccount(
    @LoggedUser() user: UserEntity,
    @Body() dto: UpdateMyAccountDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.updateMyAccountService.execute(
      dto,
      user.id,
    );
    return res.status(status).send(data);
  }

  @ApiTags('My account')
  @Delete('/my-account') //Deleta a conta do usuário logado
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete logged user`s account',
  })
  async DeleteMyAccount(@LoggedUser() user: UserEntity, @Res() res: Response) {
    const { status, message } = await this.deleteMyAccountService.execute(
      user.id,
    );
    return res.status(status).send(message);
  }
>>>>>>> be455c33de0451cc30d71fe1e808ffc068fb2dc9
}
