import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule, BasicConfig } from '../src';

describe('Loading configuration with dotenv', () => {
  let app: INestApplication;

  it('should be able to load config from .env file', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule.withDotEnv()],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const config = app.get(BasicConfig);

    expect(config.num).toBe(42);
    expect(config.str).toBe('foo');
  });

  afterEach(async () => {
    await app?.close();
  });
});
