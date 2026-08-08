import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { AuthRepositoryInterface } from '../contracts/auth-repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async saveVerificationCode(userId: string, token: string): Promise<string> {
    await this.prisma.verificationCode.create({
      data: {
        userId,
        token,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });
    return token;
  }

  async getVerificationCode(userId: string): Promise<string | null> {
    const verificationCode = await this.prisma.verificationCode.findUnique({
      where: {
        userId,
      },
    });
    return verificationCode?.token || null;
  }

  async deleteVerificationCode(userId: string): Promise<void> {
    await this.prisma.verificationCode.delete({
      where: {
        userId,
      },
    });
  }
}
