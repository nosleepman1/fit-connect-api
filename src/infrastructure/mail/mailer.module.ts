import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  MailerModuleConfig,
  MailerServiceProvider,
} from './configs/mailer.config';
import { MAILER_TOKEN } from './contracts/tokens';

@Module({
  imports: [ConfigModule, MailerModuleConfig],
  controllers: [],
  providers: [MailerServiceProvider],
  exports: [MAILER_TOKEN],
})
export class MailerModule {}
