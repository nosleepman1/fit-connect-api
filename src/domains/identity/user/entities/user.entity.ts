import type { Role } from '../types/user.types';

export class UserEntity {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  role!: Role;
  isVerified!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
