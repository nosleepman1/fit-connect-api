import { Gender } from '../types/profile.types';

export class Profile {
  id!: string;
  firstName!: string;
  lastName!: string;
  gender!: Gender;
  dateOfBirth!: Date;
  height!: number;
  weight!: number;
  createdAt!: Date;
  updatedAt!: Date;
  userId!: string;
}
