import { ApiProperty } from '@nestjs/swagger';
import {  IsNumber, IsNotEmpty } from 'class-validator';

export class DeActivateUserDto {
  @ApiProperty({ example: '12', description: 'User id ' })
  @IsNotEmpty()
  @IsNumber({}, { message: "UserID number bo'lishi kerak" })
  readonly userId: number;
}
