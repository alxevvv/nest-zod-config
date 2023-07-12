import { ParseParams, z } from 'zod';

import { ZodConfigModule } from './zod-config.module';
import { ConfigLoaders, ZodConfig, ZodConfigSchema } from './zod-config.types';

export async function loadConfig<S extends ZodConfigSchema = ZodConfigSchema>(
  config: ZodConfig<S>,
  loader: ConfigLoaders,
  parseParams?: Partial<ParseParams & { async: true }>,
): Promise<z.infer<S>> {
  const schema = config.__schema;
  const configLoaded = await ZodConfigModule.loadConfig(loader);
  return schema.parseAsync(configLoaded, parseParams);
}
