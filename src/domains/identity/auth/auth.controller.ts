import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from '../user/entities/user.entity';
import { LoginResponse } from './types/auth.types';
import { JwtAuthGuard } from '../strategy/jwt-auth.guard';
import { Request } from 'express';
import { CurrentUser } from 'src/infrastructure/decorators/current-user.decorator';
import { AuthThrottle } from '../../../infrastructure/decorators/auth-throttler.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @AuthThrottle()
  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<UserEntity> {
    return this.authService.register(registerDto);
  }

  @AuthThrottle()
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request): any {
    return req.user;
  }

  @Post('verify')
  async verify(
    @CurrentUser('sub') userId: string,
    @Body() body: { code: string },
  ): Promise<void> {
    await this.authService.verifyAcount(userId, body.code);
  }
}
