import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { MailerInterface } from './contracts/mailer.interface';
import { UserEntity } from 'src/domains/identity/user/entities/user.entity';

@Injectable()
export class MailerService implements MailerInterface {
  constructor(private readonly mailerService: NestMailerService) {}

  sendAccountVerificationCodeEmail(
    user: UserEntity,
    code: string,
  ): Promise<void> {
    return this.mailerService.sendMail({
      to: user.email,
      subject: 'FitConnect - Code de vérification',
      template: './verification-code',
      context: {
        code,
        user,
      },
    });
  }

  sendResetPasswordCodeEmail(user: UserEntity, code: string): Promise<void> {
    return this.mailerService.sendMail({
      to: user.email,
      subject: 'FitConnect - Code de réinitialisation du mot de passe',
      template: './reset-password-code',
      context: {
        code,
        user,
      },
    });
  }
}
