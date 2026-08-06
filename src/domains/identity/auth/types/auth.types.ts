import { UserEntity } from '../../user/entities/user.entity';

export interface LoginResponse {
  token: string;
  user: UserEntity;
}

export interface Payload {
  sub: string;
  email: string;
}
