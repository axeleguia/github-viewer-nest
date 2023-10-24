import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GitHubModule } from './github/github.module';
import { HealthModule } from './health/health.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HeadersInterceptor } from './commons/interceptors/headers.interceptor';

@Module({
  imports: [ConfigModule.forRoot(), GitHubModule, HealthModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HeadersInterceptor,
    },
  ],
})
export class AppModule {}
