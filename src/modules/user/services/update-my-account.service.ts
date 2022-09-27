import { Injectable } from '@nestjs/common';
import { UpdateMyAccountDto } from '../dto/update-my-account.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UpdateMyAccountService {
  constructor(private userRep: UserRepository) {}

  async execute(dto: UpdateMyAccountDto, id: number) {
    const user = await this.userRep.updateMyAccount(dto, id);

    delete user.password;

    return { status: 200, data: user };
  }
}
