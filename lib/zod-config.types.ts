import { Loader } from 'config-loaders';
import { ParseParams, z } from 'zod';

export type ZodConfigSchema = z.ZodObject<any>;

export type ZodConfig<S extends ZodConfigSchema> = {
  __schema: S;

  new (): z.infer<S>;
};

type Loaders<T> = T | [T, ...T[]];

export type ConfigLoaders = Loaders<Loader>;

export interface ZodConfigModuleOptions<S extends ZodConfigSchema = ZodConfigSchema> {
  /**
   * Configuration class
   */
  config: ZodConfig<S>;

  /**
   * Configuration Loader(s)
   */
  loader: ConfigLoaders;

  /**
   * If `true`, registers `ConfigModule` as a global module.
   * @see https://docs.nestjs.com/modules#global-modules
   * @default false
   */
  isGlobal?: boolean;

  /**
   * Zod's `parse` function params
   * @see https://github.com/colinhacks/zod/blob/master/src/helpers/parseUtil.ts
   */
  parseParams?: Partial<ParseParams & { async: true }>;
}
