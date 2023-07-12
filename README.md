# nest-zod-config

Define NestJS configuration with validation and type safety using zod

## Install

```
npm install zod nest-zod-config
```

If you want to load configuration from `.env` file, also install
[dotenv](https://github.com/motdotla/dotenv) package:

```
npm install dotenv
```

## Example

```properties
# .env

port=3000
str=something
```

### Usage in NestJS module

```typescript
// app.config.ts

import { Config } from 'nest-zod-config';
import { z } from 'zod';

const appConfigSchema = z.object({
  port: z.number(),
  str: z.string(),
});

export class AppConfig extends Config(appConfigSchema) {}
```

```typescript
// app.service.ts

import { Injectable } from '@nestjs/common';

import { AppConfig } from './app.config';

@Injectable()
export class AppService {
  constructor(private readonly config: AppConfig) {}

  someMethod() {
    // `this.config` now contains your configuration with types:
    // { port: 3000, str: 'something' }
  }
}
```

```typescript
// app.module.ts

import { ZodConfigModule, dotEnvLoader } from 'nest-zod-config';

import { AppConfig } from './app.config';
import { AppService } from './app.service';

@Module({
  imports: [
    ZodConfigModule.forRootAsync({
      config: AppConfig,
      loader: dotEnvLoader(),
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
```

### Usage outside of NestJS modules

For example in the `bootstrap` function before application creation:

```typescript
// main.ts

import { NestFactory } from '@nestjs/core';
import { dotEnvLoader, loadConfig } from 'nest-zod-config';
import { AppModule } from './app.module';
import { AppConfig } from './app.config';

async function bootstrap() {
  const config = await loadConfig(AppConfig, dotEnvLoader());
  const app = await NestFactory.create(AppModule);
  await app.listen(config.PORT);
}

bootstrap();
```

## License

Licensed under the MIT license. Copyright (c) 2023-present Vladislav Alexeev
