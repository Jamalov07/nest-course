import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUsersDto {
  @ApiProperty({ example: 'User1', description: 'Foydalanuvchi ismi' })
  @IsNotEmpty({ message: "name bo'sh bo'lmasligi kerak" })
  @IsString({ message: "name string bo'lishi kerak" })
  readonly name: string;
  @ApiProperty({
    example: 'User1@gmail.com',
    description: 'Foydalanuvchi emaili',
  })
  @IsNotEmpty({ message: "email bo'sh bo'lmasligi kerak" })
  @IsEmail({}, { message: "email string bo'lishi kerak" })
  readonly email: string;
  @ApiProperty({ example: 'User1234', description: 'Foydalanuvhci passwordi' })
  @IsNotEmpty({ message: "password bo'lishi kerak" })
  @IsString({ message: "password string holatida bo'lishi kerak" })
  @MinLength(4, { message: '4 dan kop bolishi kerak' })
  readonly password: string;
}
