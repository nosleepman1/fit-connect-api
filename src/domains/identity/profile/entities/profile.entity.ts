import { Gender } from '../types/profile.types';

export class ProfileEntity {
  id!: string;
  avatarUrl!: string | null;
  bio!: string | null;
  phone!: string | null;
  gender!: Gender;
  dateOfBirth!: Date | null;
  height!: number | null;
  weight!: number | null;
  createdAt!: Date;
  updatedAt!: Date;
  userId!: string;
}
