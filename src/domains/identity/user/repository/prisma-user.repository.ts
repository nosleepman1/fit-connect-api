import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../contracts/user-repository.interface';
import { UserEntity } from '../entities/user.entity';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import type { CreateUserDto } from '../dto/create-user.dto';
import { UserSelect } from '../types/user.types';
import { User } from 'src/infrastructure/database/generated/prisma/client';

@Injectable()
export class PrismaUserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data: createUserDto,
      select: UserSelect,
    });
  }

  findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      select: UserSelect,
    });
  }

  findById(id: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: UserSelect,
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    return this.prisma.user.update({
      where: { id },
      data,
      select: UserSelect,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
