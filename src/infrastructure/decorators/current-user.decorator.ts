import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { Payload } from 'src/domains/identity/auth/types/auth.types';

export const CurrentUser = createParamDecorator(
  (data: keyof Payload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as Payload;

    return data ? user[data] : user;
  },
);