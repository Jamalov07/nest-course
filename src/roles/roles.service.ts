import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiBody } from '@nestjs/swagger';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  
  async getAllRoles() {
    const roles = await this.roleRepository.findAll({ include: { all: true } });
    return roles;
  }
  
  async getRoleById(id: number) {
    return await this.roleRepository.findByPk(id);
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }

  async createRole(createRoleDto: CreateRolesDto) {
    const newRole = await this.roleRepository.create(createRoleDto);
    return newRole;
  }

  async updateRole(id: number, updateRoleDto: UpdateRolesDto) {
    return this.roleRepository.update(updateRoleDto, { where: { id: id } });
  }
  
  async deleteRolebyId(id: number) {
    const data = await this.roleRepository.destroy({ where: { id: id } });
    if (!data) {
      throw new HttpException('Bunday rol mavjud emas', HttpStatus.BAD_REQUEST);
    }
    return 'role deleted';
  }
}
