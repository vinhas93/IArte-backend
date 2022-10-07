import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class FindUserByIdService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number) {
    const userExists = await this.userRepository.findUserById(id);

    if (!userExists) {
      return {
        status: 400,
        data: { message: 'User not found' },
      };
    }

    return {
      status: 200,
      data: userExists,
    };
  }
}
