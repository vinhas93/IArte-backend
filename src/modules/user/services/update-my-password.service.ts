import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateMyPasswordDto } from '../dto/update-my-password.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UpdateMyPasswordService {
  constructor(private userRep: UserRepository) {}

  async execute(dto: UpdateMyPasswordDto, id: number) {
    const user = await this.userRep.findUserById(id);
    // const user = await this.userRep.updateMyAccount(dto, id);

    const isHashValid = await bcrypt.compare(dto.oldPassword, user.password);

    if (!isHashValid) {
      throw new BadRequestException('Wrong Password');
    }

    delete user.password;

    return { status: 200, data: user };
  }
}
