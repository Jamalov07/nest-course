import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsEqualParamAndTokenIds } from '../guards/ParamTokenIsEqual.guard';
import { CreateUsersDto } from '../users/dto/create-user.dto';
import { UpdateUsersDto } from '../users/dto/update-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth-dto';
import { AuthResponse } from './token.model';
@ApiTags('Avtorizatsiya')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Fodalanuvchi qayta kirishi' })
  @ApiResponse({ status: 200, type: AuthResponse })
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Fodalanuvchi yaratish' })
  @ApiResponse({
    status: 200,
    type: AuthResponse,
  })
  @Post('/registration')
  registration(@Body() createUserDto: CreateUsersDto) {
    return this.authService.registration(createUserDto);
  }
  @ApiOperation({ summary: "foydalanuvchiga o'zgartirish kiritish" })
  @ApiResponse({ status: 200, type: AuthResponse })
  @UseGuards(IsEqualParamAndTokenIds)
  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUsersDto) {
    return this.authService.updateUser(id, updateUserDto);
  }
}
