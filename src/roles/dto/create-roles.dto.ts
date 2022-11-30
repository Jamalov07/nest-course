import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolesDto {
  @ApiProperty({
    example: 'User',
    description: 'foydalanuvchi beriladigan rol nomi',
  })
  @IsNotEmpty({ message: "value bo'sh bo'lamsligi kerak" })
  @IsString({ message: "value string bo'lishi kerak" })
  readonly value: string;
  @ApiProperty({
    example: 'bu User haqida',
    description: 'Rol haqida malumot',
  })
  @IsNotEmpty({ message: 'malumot bolishi kerak' })
  @IsString({ message: 'description string bolishi kerak' })
  readonly description: string;
}
