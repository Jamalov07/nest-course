import {
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUsersDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login-auth-dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';
import { UpdateUsersDto } from '../users/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new HttpException('foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    return this.generateToken(user);
  }

  async registration(userDto: CreateUsersDto) {
    const condidate = await this.userService.getUserByEmail(userDto.email);
    if (condidate) {
      throw new HttpException(
        'Bunday foydalanuvchi mavjud',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    const token = await this.generateToken(user);
    return token;
  }

  async updateUser(id: number, updateUserDto: UpdateUsersDto) {
    const oldUser = await this.userService.getOne(id);
    if (!oldUser) {
      throw new HttpException(
        'Bunday foydalanuvchi yoq',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (updateUserDto.email) {
      const condidate = await this.userService.getUserByEmail(
        updateUserDto.email,
      );
      if (condidate) {
        throw new HttpException(
          'Bunday foydalanuvchi mavjud',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 7);
    const user = await this.userService.updateUser(id, {
      ...updateUserDto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    const token = await { token: await this.jwtService.sign(payload) };
    return token;
  }
  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Email yoki password notogri');
    }
    const validPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (user && validPassword) {
      return user;
    }
    throw new UnauthorizedException('Email yoki password notogri');
  }
}
