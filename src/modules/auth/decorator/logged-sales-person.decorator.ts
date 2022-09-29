import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

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
      throw new UnauthorizedException(
        'User does not have permission to access this route',
      );
    }
  },
);
