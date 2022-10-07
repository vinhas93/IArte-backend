import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class GetUserByIdDto {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}

export class UpdateUserRole {
  @IsEnum(['Owner', 'Manager', 'SalesPerson'])
  @IsIn(['Owner', 'Manager', 'SalesPerson'])
  @ApiProperty({
    description: 'Grants user access to routes based on roles',
    example: 'Owner',
  })
  role: UserRole;
}

export class UserEmailDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's email address",
    example: 'owner@iarte.com',
  })
  email: string;
}
