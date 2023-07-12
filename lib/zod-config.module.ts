import { DynamicModule, Logger, Module, Provider } from '@nestjs/common';
import merge from 'lodash.merge';
import { JsonObject } from 'type-fest';

import { ZodConfig, ZodConfigModuleOptions, ZodConfigSchema } from './zod-config.types';

@Module({})
export class ZodConfigModule {
  public static async forRootAsync(options: ZodConfigModuleOptions): Promise<DynamicModule> {
    const configLoaded = await this.loadConfig(options.loader);
    return this.getDynamicModule(options, configLoaded);
  }

  private static async getDynamicModule(
    options: ZodConfigModuleOptions,
    configLoaded: JsonObject,
  ): Promise<DynamicModule> {
    const { config, isGlobal = false, parseParams } = options;
    const schema = config.__schema;

    const configValue = await schema.parseAsync(configLoaded, parseParams);

    const providers = this.getProviders(config, configValue);

    return {
      global: isGlobal,
      module: ZodConfigModule,
      providers,
      exports: providers,
    };
  }

  static async loadConfig(loader: ZodConfigModuleOptions['loader']) {
    if (Array.isArray(loader)) {
      const configValue = {};
      for (const l of loader) {
        try {
          const conf = await l.getValue();
          merge(configValue, conf);
        } catch (err: any) {
          this.logError(err.message);
        }
      }
      return configValue;
    }
    return loader.getValue();
  }

  private static getProviders(
    config: ZodConfig<ZodConfigSchema>,
    configValue: JsonObject,
  ): Provider[] {
    return [
      {
        provide: config,
        useValue: configValue,
      },
    ];
  }

  private static logError(message: any) {
    Logger.error(`Config loading failed: ${message}`, 'ZodConfigModule');
  }
}
