import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";



export class CreateUserDto {
    @Length(3, 30)
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "User's name",
        example: 'John Smith'
    })
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: "User's photograph",
        example: 'https://user-photo.com'
    })
    image: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "User's password",
        example: 'JSm1th@'
    })
    password: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: "User's email address",
        example: 'j_smith@gmail.com'
    })
    email: string;

    @IsEnum(['Owner','Manager','SalesPerson'])
    @ApiProperty({
        description: "Grants user access to routes based on roles",
        example: 'SalesPerson'
    })
    role: UserRole;
}