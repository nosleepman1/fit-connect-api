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
import { BullModule } from '@nestjs/bullmq';

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
      name: 'sendEmailVerification',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategyService,
    AuthMailerService,
    { provide: AUTH_REPOSITORY_TOKEN, useClass: AuthRepository },
  ],
})
export class AuthModule {}
