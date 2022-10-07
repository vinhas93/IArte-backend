import { Injectable } from '@nestjs/common';
import { UserRepository } from './../repository/user.repository';

@Injectable()
export class UpdateUserRoleById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number, role: string) {
    const userExists = await this.userRepository.findUserById(id);

    if (!userExists) {
      return {
        status: 400,
        data: { message: 'User not found' },
      };
    }

    const updatedUser = await this.userRepository.updateUserRoleById(id, role);

    return {
      status: 200,
      data: updatedUser,
    };
  }
}
