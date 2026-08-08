import { Inject, Injectable } from '@nestjs/common';
import { MailerInterface } from 'src/infrastructure/mail/contracts/mailer.interface';
import { MAILER_TOKEN } from 'src/infrastructure/mail/contracts/tokens';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class AuthMailerService {
  constructor(
    @Inject(MAILER_TOKEN)
    private readonly mailer: MailerInterface,
  ) {}

  async sendVerificationEmail(user: UserEntity, token: string): Promise<void> {
    await this.mailer.sendAccountVerificationCodeEmail(user, token);
  }
}
