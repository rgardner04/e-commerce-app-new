import { Test, TestingModule } from '@nestjs/testing';
import { ProxyMiddleware } from './proxy.middleware';

describe('ProxyMiddleware', () => {
  let service: ProxyMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProxyMiddleware],
    }).compile();

    service = module.get<ProxyMiddleware>(ProxyMiddleware);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
