import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class ZodConfigModule {
  public static async forRootAsync(): Promise<DynamicModule> {
    return {
      module: ZodConfigModule,
    };
  }
}
