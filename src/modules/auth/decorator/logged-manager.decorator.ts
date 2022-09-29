import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const LoggedManager = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userObject = request.user;

    if (userObject.role === 'Owner' || userObject.role === 'Manager') {
      delete userObject.password;

      return userObject;
    } else {
      return {
        status: 401,
        data: 'User does not have permission to access this route',
      };
    }
  },
);
