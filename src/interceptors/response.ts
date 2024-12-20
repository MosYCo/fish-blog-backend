import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { map, tap } from 'rxjs/operators';
import { LogUtil } from '../utils/log';

interface Response<T> {
  data: T;
  code: HttpStatus;
  message: string;
  success: boolean;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    const now = new Date().getTime();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    return next
      .handle()
      .pipe(
        map((data) => {
          return {
            code: HttpStatus.OK,
            success: true,
            message: 'Success',
            timestamp: new Date().getTime().toString(),
            data,
          };
        }),
      )
      .pipe(
        tap(() => {
          LogUtil.success(
            `请求 ${request.url} 调用完成, 耗时${new Date().getTime() - now}ms`,
          );
        }),
      );
  }
}
