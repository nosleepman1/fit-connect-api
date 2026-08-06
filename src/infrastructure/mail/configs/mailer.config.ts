import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { MAILER_TOKEN } from '../contracts/tokens';
import { MailerService } from '../mailer.service';

export const MailerModuleConfig = NestMailerModule.forRoot({
  transport: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  },
  defaults: {
    from: process.env.MAIL_FROM,
  },
  template: {
    dir: `${process.cwd()}/src/infrastructure/mail/templates`,
    options: {
      strict: true,
    },
  },
});

export const MailerServiceProvider = {
  provide: MAILER_TOKEN,
  useClass: MailerService,
};
