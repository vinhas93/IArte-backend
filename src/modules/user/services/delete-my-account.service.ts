import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class DeleteMyAccountService {
  constructor(private userRep: UserRepository) {}

  async execute(id: number) {
    await this.userRep.deleteMyAccount(id);

    return { status: 200, message: 'Your account has been deleted.' };
  }
}
