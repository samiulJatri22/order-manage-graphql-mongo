import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerResolver } from './consumer.resolver';
import { ConsumerService } from './consumer.service';

describe('ConsumerResolver', () => {
  let resolver: ConsumerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumerResolver, ConsumerService],
    }).compile();

    resolver = module.get<ConsumerResolver>(ConsumerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
