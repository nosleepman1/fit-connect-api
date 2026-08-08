import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { MAILER_TOKEN } from '../contracts/tokens';
import { MailerService } from '../mailer.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';

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
    adapter: new HandlebarsAdapter(),
    dir: 'src/infrastructure/mail/templates',
    options: {
      strict: true,
    },
  },
});

export const MailerServiceProvider = {
  provide: MAILER_TOKEN,
  useClass: MailerService,
};
