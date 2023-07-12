import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule, BasicConfig, BasicConfigWithDefaultValue } from '../src';

describe('Config loading and validation', () => {
  let app: INestApplication;

  it('should throw if validation failed', async () => {
    const module = Test.createTestingModule({
      imports: [
        AppModule.withValue(BasicConfig, {
          str: 'foo',
        }),
      ],
    });

    await expect(module.compile()).rejects.toThrow();
  });

  it('should use default value', async () => {
    const module = await Test.createTestingModule({
      imports: [
        AppModule.withValue(BasicConfigWithDefaultValue, {
          str1: 'test_value_1',
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const config = app.get(BasicConfigWithDefaultValue);

    expect(config.str1).toBe('test_value_1');
    expect(config.str2).toBe('default_value');
  });

  it('should be able to use multiple loaders', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule.withMultipleLoaders()],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const config = app.get(BasicConfig);

    expect(config.str).toBe('test');
    expect(config.num).toBe(42);
  });

  afterEach(async () => {
    await app?.close();
  });
});
