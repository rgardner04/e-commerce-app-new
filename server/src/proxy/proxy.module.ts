import {
  Module,
  Logger,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ProxyMiddleware } from './proxy.middleware';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  providers: [ConfigService, ProxyMiddleware, Logger],
})
export class ProxyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProxyMiddleware)
      .forRoutes({ path: '/auth/*path', method: RequestMethod.ALL });
  }
}
