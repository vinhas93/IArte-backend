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
  RecoveryPasswordByEmail,
  UpdateMyAccountService,
  UpdateMyPasswordService,
  UpdateUserRoleById,
} from './services';
import { UserRepository } from './repository/user.repository';
import { PassportModule } from '@nestjs/passport';
import { DeleteMyAccountService } from './services/delete-my-account.service';
import { MailModule } from '../mails/mail.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), MailModule],
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
    UpdateUserRoleById,
    RecoveryPasswordByEmail,
  ],
})
export class UserModule {}
