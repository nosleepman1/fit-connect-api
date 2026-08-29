import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CurrentUser } from '../../../infrastructure/decorators/current-user.decorator';
import { ProfileEntity } from './entities/profile.entity';
import { JwtAuthGuard } from '../strategy/jwt-auth.guard';
import { UserEntity } from '../user/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(
    @CurrentUser('sub') id: string,
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<ProfileEntity> {
    return this.profileService.createProfile(id, createProfileDto);
  }

  @Get('/user')
  findByUserId(@CurrentUser('sub') id: string): Promise<ProfileEntity | null> {
    return this.profileService.findProfileByUserId(id);
  }

  @Patch(':id')
  update(
    @CurrentUser('sub') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.profileService.remove(id);
  }
}
