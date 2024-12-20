import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response';
import { HttpFailedFilter } from './filters/http-faild';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpFailedFilter,
    },
    AppService,
  ],
})
export class AppModule {}
