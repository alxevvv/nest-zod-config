import { z } from 'zod';

export type ZodConfigSchema = z.ZodObject<any>;

export type ZodConfig<S extends ZodConfigSchema> = {
  __schema: S;

  new (): z.infer<S>;
};
