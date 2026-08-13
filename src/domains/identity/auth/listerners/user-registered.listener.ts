import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../events/user-registered.event';

@Injectable()
class UserRegisteredListener {


  @OnEvent('user.registered')
  alertUserRegisteredListener(
    userRegisteredEvent: UserRegisteredEvent,
  ): void {
    console.log('registered!');
    console.log(userRegisteredEvent.user);
  }
}

export default UserRegisteredListener;