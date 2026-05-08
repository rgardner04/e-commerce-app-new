import { Injectable, Inject, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request, Response, NextFunction, RequestHandler } from 'express';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    @Inject(Logger) private readonly logger: Logger,
  ) {
    this.proxy = createProxyMiddleware({
      target: this.configService.get<string>('AUTH_SERVICE_URL'),
      changeOrigin: true,
      secure: false,
      on: {
        proxyReq: (proxyReq, req) => {
          this.logger.log(
            `Forwarding to: ${this.configService.get<string>('AUTH_SERVICE_URL')}${req.url}`,
          );

          if (!req.body) return;

          const bodyData = JSON.stringify(req.body);

          proxyReq.setHeader('Content-Type', 'application/json');
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));

          proxyReq.write(bodyData);
        },
        proxyRes: (_proxyRes, res) => {
          this.logger.log(
            `Handling proxied response from ${this.configService.get<string>('AUTH_SERVICE_URL')}${res.url}`,
          );
        },
        error: (err, req, res) => {
          this.logger.error(
            `Proxy error: ${err instanceof Error ? err?.message : ''}`,
          );
        },
      },
    });
  }

  private proxy: RequestHandler;

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `Proxying request from gateway to Auth Service. Path: ${req.originalUrl}`,
    );
    this.proxy(req, res, next);
  }
}
