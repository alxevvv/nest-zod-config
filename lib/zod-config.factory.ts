import { Injectable } from '@nestjs/common';

import { ZodConfig, ZodConfigSchema } from './zod-config.types';

export function Config<S extends ZodConfigSchema>(schema: S): ZodConfig<S> {
  @Injectable()
  class InjectableConfig {
    static __schema = schema;
  }
  return InjectableConfig;
}
