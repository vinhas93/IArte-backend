import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const LoggedSalesPerson = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userObject = request.user;

    if (
      userObject.role === 'Owner' ||
      userObject.role === 'Manager' ||
      userObject.role === 'SalesPerson'
    ) {
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
