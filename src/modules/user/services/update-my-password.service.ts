import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateMyPasswordDto } from '../dto/update-my-password.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UpdateMyPasswordService {
  constructor(private userRep: UserRepository) {}

  async execute(dto: UpdateMyPasswordDto, id: number) {
    if (dto.oldPassword === dto.password) {
      return {
        status: 400,
        data: 'You need to write a different password.',
      };
    }

    const user = await this.userRep.findUserById(id);

    const isHashValid = await bcrypt.compare(dto.oldPassword, user.password);

    if (!isHashValid || dto.password !== dto.confirmNewPassword) {
      return {
        status: 400,
        data: 'Wrong Password',
      };
    }

    delete dto.confirmNewPassword;
    delete dto.oldPassword;

    dto.password = await bcrypt.hash(dto.password, 10);

    await this.userRep.updateMyPassword(dto, id);

    return { status: 200, data: 'Your password is up to date.' };
  }
}
