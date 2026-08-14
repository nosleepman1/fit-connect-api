import { Inject, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PROFILE_TOKEN } from './contracts/tokens';
import { ProfileInterface } from './contracts/profile.interface';
import { ProfileEntity } from './entities/profile.entity';
import { use } from 'passport';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(PROFILE_TOKEN) private readonly profileRepository: ProfileInterface,
  ) {}

  createProfile(
    userId: string,
    createProfileDto: CreateProfileDto
  ): Promise<ProfileEntity> {
    return this.profileRepository.createProfile(userId, createProfileDto);
  }

  findProfileByUserId(userId: string): Promise<ProfileEntity | null> {
    return this.profileRepository.getProfileByUserId(userId);
  }

  findProfileById(id: string): Promise<ProfileEntity | null> {
    return this.profileRepository.getProfileById(id);
  }

  update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    return this.profileRepository.updateProfile(id, updateProfileDto);
  }

  remove(id: string) : Promise<void> {
    return this.profileRepository.deleteProfileById(id);
  }
}
