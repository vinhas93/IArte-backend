import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateMyPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's password",
    example: '0Wn3r12#$',
  })
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'You need a stronger password.',
  })
  @ApiProperty({
    description:
      "User's password should contain at least capital letters, small letters, a number and or a special character.",
    example: '0Wn3r12#$2.0',
  })
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Confirm password',
    example: '0Wn3r12#$2.0',
  })
  confirmNewPassword: string;
}
