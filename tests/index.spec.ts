import { Config, ZodConfigModule } from '../lib/index';

describe('index.ts', () => {
  it('should export Config superclass', () => {
    expect(Config).toBeDefined();
  });

  it('should export module class', () => {
    expect(ZodConfigModule).toBeDefined();
  });
});
