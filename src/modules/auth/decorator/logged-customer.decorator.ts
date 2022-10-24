import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const LoggedCustomer = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const customerObject = request.Customer;

    if (customerObject) {
      delete customerObject.password;

      return customerObject;
    } else {
      throw new UnauthorizedException('You don`t have permission to access.');
    }
  },
);
