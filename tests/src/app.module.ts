import { join } from 'node:path';

import { DynamicModule, Module } from '@nestjs/common';
import { DotEnvLoader, ValueLoader } from 'config-loaders';

import { ZodConfig, ZodConfigModule, ZodConfigSchema } from '../../lib';
import { BasicConfig, DummyConfig } from './app.config';
import { AppService } from './app.service';

@Module({})
export class AppModule {
  static withAppContext(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ZodConfigModule.forRootAsync({
          config: DummyConfig,
          loader: new ValueLoader({ value: {} }),
        }),
      ],
    };
  }

  static withInjection(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ZodConfigModule.forRootAsync({
          config: DummyConfig,
          loader: new ValueLoader({ value: {} }),
        }),
      ],
      providers: [AppService],
    };
  }

  static withValue<S extends ZodConfigSchema>(config: ZodConfig<S>, value: any): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ZodConfigModule.forRootAsync({
          config,
          loader: new ValueLoader({
            value,
          }),
        }),
      ],
    };
  }

  static withMultipleLoaders(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ZodConfigModule.forRootAsync({
          config: BasicConfig,
          loader: [
            new ValueLoader({ value: { str: 'test' } }),
            new ValueLoader({ value: { num: 42 } }),
          ],
        }),
      ],
    };
  }

  static withDotEnv(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ZodConfigModule.forRootAsync({
          config: BasicConfig,
          loader: new DotEnvLoader({
            fileDir: join(__dirname, '../fixtures/env/'),
          }),
        }),
      ],
    };
  }
}
