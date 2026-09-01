import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './domains/identity/auth/auth.module';
import { ProfileModule } from './domains/identity/profile/profile.module';
import { CommentModule } from './domains/social/comment/comment.module';
import { LikeModule } from './domains/social/like/like.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { MailerModule } from './infrastructure/mail/mailer.module';
import { BullModule } from '@nestjs/bullmq';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PostModule } from './domains/social/post/post.module';
import { PostImageModule } from './domains/social/post-image/post-image.module';
import { StorageModule } from './infrastructure/storage/storage.module';

@Module({
  imports: [
    StorageModule,
    MailerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProfileModule,
    LikeModule,
    CommentModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: Number(configService.get<number>('REDIS_PORT', 6379)),
        },
      }),
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
    PostModule,
    PostImageModule,
    StorageModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
