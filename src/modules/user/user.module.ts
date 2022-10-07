import { UserController } from './user.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import {
  CreateUserService,
  FindAllUsersService,
  FindUserByIdService,
  MyAccountService,
  UpdateMyAccountService,
  UpdateMyPasswordService,
} from './services';
import { UserRepository } from './repository/user.repository';
import { PassportModule } from '@nestjs/passport';
import { DeleteMyAccountService } from './services/delete-my-account.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserController],
  providers: [
    CreateUserService,
    MyAccountService,
    UserRepository,
    UpdateMyAccountService,
    UpdateMyPasswordService,
    DeleteMyAccountService,
    FindUserByIdService,
    FindAllUsersService,
  ],
})
export class UserModule {}
