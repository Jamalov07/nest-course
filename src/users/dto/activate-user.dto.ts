import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ActivateUserDto {
  @ApiProperty({ example: '12', description: 'User id ' })
  @IsNotEmpty({ message: "userid bo'lishi kerak" })
  @IsNumber({}, { message: "UserID number bo'lishi kerak" })
  readonly userId: number;
}
