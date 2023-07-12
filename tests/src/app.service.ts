import { Injectable } from '@nestjs/common';

import { DummyConfig } from './app.config';

@Injectable()
export class AppService {
  constructor(private readonly _config: DummyConfig) {}

  get config() {
    return this._config;
  }
}
