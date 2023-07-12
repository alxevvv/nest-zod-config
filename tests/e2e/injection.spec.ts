import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule, AppService, DummyConfig } from '../src';

describe('Config injection', () => {
  let app: INestApplication;

  it('should be available in the application context', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule.withAppContext()],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const config = app.get(DummyConfig);

    expect(config).toBeDefined();
  });

  it('should be injectable', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule.withInjection()],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const config = app.get(DummyConfig);
    const appService = app.get(AppService);

    expect(appService.config === config).toBe(true);
  });

  afterEach(async () => {
    await app?.close();
  });
});
