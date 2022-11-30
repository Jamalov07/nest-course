import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// import { ValidationPipe } from 'src/pipe/validation.pipe';
import { ActivateUserDto } from './dto/activate-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUsersDto } from './dto/create-user.dto';
import { DeActivateUserDto } from './dto/deActivate-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Foydalanuvchilar')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @ApiOperation({ summary: 'Fodalanuvchi yaratish' })
  // @ApiResponse({ status: 201, type: User })
  // @Post()
  // create(@Body() createUserDto: CreateUsersDto) {
  //   return this.userService.createUser(createUserDto);
  // }

  @ApiOperation({ summary: 'Foydalanuvchilarni olish' })
  @ApiResponse({ status: 200, type: [User] })
  // @Roles('ADMIN')
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() updateUserDto: UpdateUsersDto) {
  //   return this.userService.updateUser(id, updateUserDto);
  // }

  @ApiOperation({ summary: 'Foydalanuvchini idsi  orqali olish' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.userService.getOne(id);
  }

  @ApiOperation({ summary: 'Fodalanuvchiga rol berish' })
  @ApiResponse({ status: 201, type: User })
  @Post('role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.userService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: 'Fodalanuvchini activate qilish' })
  @ApiResponse({ status: 200, type: User })
  @Post('activate')
  activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.userService.activateUser(activateUserDto);
  }

  @ApiOperation({ summary: 'Fodalanuvchini deActivate qilish' })
  @ApiResponse({ status: 200, type: User })
  @Post('deactivate')
  deActivateUser(@Body() deActivateUserDto: DeActivateUserDto) {
    return this.userService.deActivateUser(deActivateUserDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchilarni ochirish' })
  @ApiResponse({ status: 200, type: String })
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
