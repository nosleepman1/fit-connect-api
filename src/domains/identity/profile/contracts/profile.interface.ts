import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileEntity } from '../entities/profile.entity';

export interface ProfileInterface {
  createProfile(
    userId: string,
    createProfileDto: CreateProfileDto,
  ): Promise<ProfileEntity>;

  updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileEntity>;

  getProfileById(id: string): Promise<ProfileEntity | null>;

  getProfileByUserId(userId: string): Promise<ProfileEntity | null>;

  deleteProfileById(id: string): Promise<void>;
}
