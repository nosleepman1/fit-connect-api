import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from '../strategy/jwt-strategy.service';
import { MailerModule } from 'src/infrastructure/mail/mailer.module';
import { AuthMailerService } from './services/auth-mailer.service';
import { AUTH_REPOSITORY_TOKEN } from './contracts/tokens';
import { AuthRepository } from './repository/auth.repository';
import { UserRegisteredListener } from './listerners/user-registered.listener';
import { BullModule } from '@nestjs/bullmq';
import { EmailProcessor } from './processor/email.processor';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '30d',
      },
    }),
    MailerModule,
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategyService,
    AuthMailerService,
    UserRegisteredListener,
    EmailProcessor,

    { provide: AUTH_REPOSITORY_TOKEN, useClass: AuthRepository },
  ],
})
export class AuthModule {}
