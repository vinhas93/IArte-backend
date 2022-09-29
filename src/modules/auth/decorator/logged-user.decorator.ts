import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const LoggedUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const userObject = request.user;

  if (userObject) {
    delete userObject.password;

    return userObject;
  } else {
    return {
      status: 401,
      data: 'User does not have permission to access this route',
    };
  }
});
