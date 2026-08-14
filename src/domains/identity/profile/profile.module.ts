import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PROFILE_TOKEN } from './contracts/tokens';
import { PrismaProfileRepository } from './repositories/prisma-profile.repository';

@Module({
  controllers: [ProfileController],
  providers: [
    ProfileService,
    {
      provide: PROFILE_TOKEN,
      useClass: PrismaProfileRepository,
    },
  ],
})
export class ProfileModule {}
