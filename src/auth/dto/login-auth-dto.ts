import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user1@gmail.com',
    description: 'Foydalanuvchi elektron pochtasi',
  })
  @IsNotEmpty({ message: "email bo'lishi kerak" })
  @IsString({ message: "string bo'lishi kerak" })
  @IsEmail({}, { message: "email yaroqli bo'lishi kerak" })
  readonly email: string;
  @ApiProperty({ example: '1234456', description: 'foydalanuvchi passwordi' })
  @IsNotEmpty({ message: "password bo'lishi kerak" })
  @IsString({ message: "parol satr bo'lishi kerak" })
  @MinLength(6, { message: "Parol kamida 5 ta harfdan iborat bo'lishi kerak" })
  readonly password: string;
}
