import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  MailerModuleConfig,
  MailerServiceProvider,
} from './configs/mailer.config';

@Module({
  imports: [ConfigModule, MailerModuleConfig],
  controllers: [],
  providers: [MailerServiceProvider],
  exports: [MailerServiceProvider],
})
export class MailerModule {}
