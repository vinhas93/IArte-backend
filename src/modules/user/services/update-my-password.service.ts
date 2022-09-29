import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateMyPasswordDto } from '../dto/update-my-password.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UpdateMyPasswordService {
  constructor(private userRep: UserRepository) {}

  async execute(dto: UpdateMyPasswordDto, id: number) {
    const user = await this.userRep.findUserById(id);

    const isHashValid = await bcrypt.compare(dto.oldPassword, user.password);

    if (!isHashValid) {
      throw new BadRequestException('Wrong Password');
    }

    if (dto.newPassword !== dto.confirmNewPassword) {
      throw new BadRequestException('The new password does`nt match.');
    }

    delete dto.confirmNewPassword;

    dto.newPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.userRep.updateMyPassword(dto, id);

    return { status: 200, data: 'Your password is up to date.' };
  }
}
