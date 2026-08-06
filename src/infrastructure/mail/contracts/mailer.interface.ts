import { UserEntity } from 'src/domains/identity/user/entities/user.entity';

export interface MailerInterface {
  sendAccountVerificationCodeEmail(
    user: UserEntity,
    subject: string,
    code: string,
  ): Promise<void>;

  sendResetPasswordCodeEmail(
    user: UserEntity,
    subject: string,
    code: string,
  ): Promise<void>;
}
