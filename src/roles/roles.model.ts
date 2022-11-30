import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'User', description: 'foydalanuvchi roli' })
  @Column({ type: DataType.STRING, allowNull: false })
  value: string;
  @ApiProperty({ example: 'bu user haqida', description: 'Rol haqida malumot' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  description: string;
  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
