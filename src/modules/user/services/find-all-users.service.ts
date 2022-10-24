import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class FindAllUsersService {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const allUsers = await this.userRepository.findAllUser();

    return {
      status: 200,
      data: allUsers,
    };
  }
}
