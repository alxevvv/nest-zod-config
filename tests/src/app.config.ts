import { z } from 'zod';

import { Config } from '../../lib';

const dummyConfigSchema = z.object({});

export class DummyConfig extends Config(dummyConfigSchema) {}

const basicConfigSchema = z.object({
  str: z.string(),
  num: z.number(),
});

export class BasicConfig extends Config(basicConfigSchema) {}

const basicConfigWithDefaultValueSchema = z.object({
  str1: z.string(),
  str2: z.string().default('default_value'),
});

export class BasicConfigWithDefaultValue extends Config(basicConfigWithDefaultValueSchema) {}
