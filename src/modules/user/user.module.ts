import { UserController } from './user.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import {
  CreateUserService,
  MyAccountService,
  UpdateMyAccountService,
  UpdateMyPasswordService,
} from './services';
import { UserRepository } from './repository/user.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserController],
  providers: [
    CreateUserService,
    MyAccountService,
    UserRepository,
    UpdateMyAccountService,
    UpdateMyPasswordService,
  ],
})
export class UserModule {}
