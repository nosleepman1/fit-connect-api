import { UserEntity } from '../entities/user.entity';
import type { CreateUserDto } from '../dto/create-user.dto';
import { User } from 'src/infrastructure/database/generated/prisma/client';

export interface UserRepositoryInterface {
  create(createUserDto: CreateUserDto): Promise<UserEntity>;

  findAll(): Promise<UserEntity[]>;

  findById(id: string): Promise<UserEntity | null>;

  findByEmail(email: string): Promise<User | null>;

  update(id: string, data: Partial<UserEntity>): Promise<UserEntity>;

  delete(id: string): Promise<void>;
}
