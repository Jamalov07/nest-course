import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'User', description: 'foydalanuvchi roli' })
  @IsNotEmpty({ message: 'value kiritilishi kerak' })
  @IsString({ message: "value string bo'lishi kerak" })
  readonly value: string;
  @ApiProperty({
    example: '17',
    description: "ro'yhatdan otgan foydalanuvchi unikal id si",
  })
  @IsNotEmpty({ message: "id bosh bo'lmasligi kerak" })
  @IsNumber({}, { message: "userid number bo'lishi kerak" })
  readonly userId: number;
}
