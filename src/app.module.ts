import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './domains/identity/auth/auth.module';
import { ProfileModule } from './domains/identity/profile/profile.module';
import { CommentModule } from './domains/social/comment/comment.module';
import { LikeModule } from './domains/social/like/like.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { MailerModule } from './infrastructure/mail/mailer.module';
import { MailerService } from './infrastructure/mail/mailer.service';
import { BullModule } from '@nestjs/bullmq';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MailerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProfileModule,
    LikeModule,
    CommentModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'auth',
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
