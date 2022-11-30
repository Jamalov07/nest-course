import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-role.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Barcha rollarni olish' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @ApiOperation({ summary: 'paramsda keladigan role id si boyicha olish' })
  @ApiResponse({ status: 200, type: Role })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.roleService.getRoleById(id);
  }

  @ApiOperation({ summary: 'Belgilangan rol boyicha malumot olish' })
  @ApiResponse({ status: 200, type: Role })
  @Get(':value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }

  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Role yaratish' })
  @ApiResponse({ status: 201, type: Role })
  @Post()
  create(@Body() createRoleDto: CreateRolesDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @ApiOperation({
    summary: 'paramsda keladigan role id si boyicha ozgartirish',
  })
  @ApiResponse({ status: 200, type: Role })
  @Put(':id')
  updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRolesDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @ApiOperation({ summary: 'paramsda keladigan role id si boyicha ochirish' })
  @ApiResponse({ status: 200, type: String })
  @Delete(':id')
  deleteRole(@Param('id') id: number) {
    return this.roleService.deleteRolebyId(id);
  }
}
