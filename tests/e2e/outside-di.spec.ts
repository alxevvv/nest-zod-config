import { loadConfig, ValueLoader } from '../../lib';
import { BasicConfig } from '../src';

describe('Loading configuration outside of NestJS app', () => {
  it('should be able to load config', async () => {
    const config = await loadConfig(
      BasicConfig,
      new ValueLoader({
        value: {
          num: 42,
          str: 'foo',
        },
      }),
    );

    expect(config.num).toBe(42);
    expect(config.str).toBe('foo');
  });
});
