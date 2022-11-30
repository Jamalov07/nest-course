import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRolesDto {
  @ApiProperty({
    example: 'User',
    description: 'foydalanuvchi beriladigan rol nomi',
  })
  @IsOptional()
  @IsString({ message: "value string bo'lishi kerak" })
  readonly value?: string;
  @ApiProperty({
    example: 'bu User haqida',
    description: 'Rol haqida malumot',
  })
  @IsOptional()
  @IsString({ message: 'description string bolishi kerak' })
  readonly description?: string;
}
