import {
  BadRequestException,
  ExecutionContext,
  Logger,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export interface Pagination {
  page: number;
  limit: number;
}

export const PaginationParams = createParamDecorator(
  (data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    Logger.log(`page: ${page}, limit: ${limit}`);
    // check if page and size are valid
    if (isNaN(page) || page < 0 || isNaN(limit) || limit < 0) {
      throw new BadRequestException('Invalid pagination params');
    }
    // do not allow to fetch large slices of the dataset
    if (limit > 100) {
      throw new BadRequestException(
        'Invalid pagination params: Max size is 100',
      );
    }
    return { page, limit };
  },
);
