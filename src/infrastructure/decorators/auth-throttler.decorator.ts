import { Throttle } from '@nestjs/throttler';
export const AuthThrottle = () =>
  Throttle({
    auth: {
      ttl: 60000,
      limit: 5,
    },
  });
