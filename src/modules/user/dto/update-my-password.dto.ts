import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

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
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Confirm password',
    example: '0Wn3r12#$2.0',
  })
  confirmNewPassword: string;
}

export class CreatePasswordHashDto {
  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({
    description: 'The password of the user.',
    example: 'Reta12@#',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'User password confirmation',
    example: 'Reta12@#',
  })
  confirmPassword: string;

  @IsString()
  @ApiProperty({
    description: 'The users recovery token.',
    example: '44b7044c452a76be1ec1c63d4a0653e1cd231108d6fb418b264e1435ca80763d',
  })
  recoverPasswordToken?: string;
}
