import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../events/user-registered.event';
import { MailerInterface } from '../../../../infrastructure/mail/contracts/mailer.interface';
import { MAILER_TOKEN } from '../../../../infrastructure/mail/contracts/tokens';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class UserRegisteredListener {
  constructor(@Inject(MAILER_TOKEN) private readonly mailer: MailerInterface,
    @InjectQueue('email') private readonly emailQueue: Queue,
  ) {}

  @OnEvent('user.registered')
  async handle(event: UserRegisteredEvent): Promise<void> {
    await this.emailQueue.add('email-verification', {
      user: event.user,
      token: event.token,
    });
  }
}
