import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsEnum, IsIn, IsNotEmpty, IsNumberString } from 'class-validator';

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
