import { UserController } from './user.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CreateUserService } from './services';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserService],
})
export class UserModule {}
