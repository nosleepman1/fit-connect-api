import type { Role } from '../types/user.types';

export class UserEntity {
  id!: string;
  email!: string;
  role!: Role;
  createdAt!: Date;
  updatedAt!: Date;
}
