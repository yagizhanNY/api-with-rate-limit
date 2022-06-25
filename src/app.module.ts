import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { PublicItemsModule } from './api/public/public-items/public-items.module';
import { PrivateItemsModule } from './api/private/private-items/private-items.module';
import { PrivateItemsController } from './api/private/private-items/private-items.controller';
import { RedisService } from './services/redis/redis.service';
import { RateLimitService } from './services/rate-limit/rate-limit.service';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env'
  }), PublicItemsModule, PrivateItemsModule],
  controllers: [],
  providers: [RedisService, RateLimitService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthenticationMiddleware)
    .forRoutes(PrivateItemsController)
  }
}
