import { UserEntity } from '../../user/entities/user.entity';

export class UserRegisteredEvent {
  constructor(
    public user: UserEntity,
    public token: string,
  ) {}
}
