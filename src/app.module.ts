import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './domains/identity/auth/auth.module';
import { ProfileModule } from './domains/identity/profile/profile.module';
import { CommentModule } from './domains/social/comment/comment.module';
import { LikeModule } from './domains/social/like/like.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { MailerModule } from './infrastructure/mail/mailer.module';
import { MailerService } from './infrastructure/mail/mailer.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProfileModule,
    LikeModule,
    CommentModule,
  ],
  controllers: [],
  providers: [MailerService],
})
export class AppModule {}
