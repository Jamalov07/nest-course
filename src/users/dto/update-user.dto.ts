import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUsersDto {
  @ApiProperty({ example: 'User1', description: 'Foydalanuvchi ismi' })
  @IsOptional()
  @IsString({ message: "name string bo'lishi kerak" })
  readonly name?: string;
  @ApiProperty({
    example: 'User1@gmail.com',
    description: 'Foydalanuvchi emaili',
  })
  @IsOptional()
  @IsEmail({}, { message: "email string bo'lishi kerak" })
  readonly email?: string;
  @ApiProperty({ example: 'User1234', description: 'Foydalanuvhci passwordi' })
  @IsOptional()
  @IsString({ message: "password string holatida bo'lishi kerak" })
  @MinLength(4, { message: '4 dan kop bolishi kerak' })
  readonly password?: string;
}
