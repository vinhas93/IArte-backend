import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entity/user.entity';

export class UserRepository extends PrismaClient {
    async createUser(data: CreateUserDto): Promise<UserEntity> {
        const createUser = await this.user.create({data});
        delete createUser.password;
        return createUser;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        return this.user.findUnique({where: {email} });
    }
}
