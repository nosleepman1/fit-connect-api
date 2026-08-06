import 'dotenv/config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from 'src/infrastructure/database/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

/* eslint-disable
  @typescript-eslint/no-unsafe-assignment,
  @typescript-eslint/no-unsafe-call
*/

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set.');
    }
    const adapter = new PrismaPg({ connectionString });
    super({ adapter });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
