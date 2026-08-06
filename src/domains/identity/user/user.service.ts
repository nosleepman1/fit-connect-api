import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { UserRepositoryInterface } from './contracts/user-repository.interface';
import { UserEntity } from './entities/user.entity';
import { USER_REPOSITORY } from './contracts/tokens';
import { hash } from 'bcrypt';
import { User } from 'src/infrastructure/database/generated/prisma/client';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create(createUserDto);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  findOne(id: string): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }
}
