import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class MyAccountService {
  constructor(private userRep: UserRepository) {}

  async execute(id: number) {
    const user = await this.userRep.findUserById(id);

    delete user.password;

    return { status: 200, data: user };
  }
}
