export type Role = 'ADMIN' | 'USER' | 'COACH';

export interface UserSelectType {
  id: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSelect = {
  id: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};
