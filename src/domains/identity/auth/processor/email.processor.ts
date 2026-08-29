import { Inject, Injectable } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { UserEntity } from '../../user/entities/user.entity';
import { MAILER_TOKEN } from '../../../../infrastructure/mail/contracts/tokens';
import { MailerInterface } from '../../../../infrastructure/mail/contracts/mailer.interface';

export interface jobData {
  user: UserEntity;
  token: string;
}

@Processor('email')
export class EmailProcessor extends WorkerHost {
  constructor(@Inject(MAILER_TOKEN) private readonly mailer: MailerInterface) {
    super();
  }

  async process(job: Job): Promise<void> {
    switch (job.name) {
      case 'email-verification': {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { user, token }: jobData = job.data;
        await this.mailer.sendAccountVerificationCodeEmail(user, token);
        break;
      }
    }
  }
}
