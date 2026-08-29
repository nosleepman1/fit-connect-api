import { Injectable } from '@nestjs/common';
import { ProfileInterface } from '../contracts/profile.interface';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileEntity } from '../entities/profile.entity';
import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class PrismaProfileRepository implements ProfileInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(
    userId: string,
    createProfileDto: CreateProfileDto,
  ): Promise<ProfileEntity> {
    return this.prisma.profile.create({
      data: {
        ...createProfileDto,

        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    return this.prisma.profile.update({
      data: {
        ...updateProfileDto,
      },
      where: {
        userId: userId,
      },
    });
  }

  async getProfileById(id: string): Promise<ProfileEntity | null> {
    return this.prisma.profile.findUnique({
      where: {
        userId: id,
      },
    });
  }
  getProfileByUserId(userId: string): Promise<ProfileEntity | null> {
    return this.prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  async deleteProfileById(id: string): Promise<void> {
    await this.prisma.profile.delete({
      where: {
        userId: id,
      },
    });
  }
}
