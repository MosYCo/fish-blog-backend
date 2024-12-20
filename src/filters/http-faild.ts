import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LogUtil } from 'src/utils/log';

@Catch()
export class HttpFailedFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const now = new Date().getTime();
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      timestamp: new Date().getTime().toString(),
      message: exception.message,
    });
    LogUtil.error(
      `请求 ${request.url} 调用失败, 耗时${new Date().getTime() - now}ms`,
      ``,
    );
  }
}
