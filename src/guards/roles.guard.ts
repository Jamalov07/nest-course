import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from '../roles/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: "Foydalanuvchi authorizatsiyadan o'tmagan",
        });
      }
      const user = this.jwtService.verify(token);
      user.roles.forEach((role: Role) => {
        if (role.value === 'Admin') {
          req.user = user;
          return true;
        }
      });
      return false;
    } catch (error) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi authorizatsiyadan o'tmagan",
      });
    }
  }
}
