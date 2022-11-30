import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'User1', description: 'Fodalanuvchi ismi' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @ApiProperty({
    example: 'User1@gmail.com',
    description: 'Foydalanuvchi emaili',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @ApiProperty({example:'User1234',description:"Foydalanuvhci passwordi"})
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @ApiProperty({example:'true',description:"foydalanuvchi aktiv yoki yo'q"})
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_active: boolean;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
