import { Module } from '@nestjs/common';
import { RateLimitService } from 'src/services/rate-limit/rate-limit.service';
import { RedisService } from 'src/services/redis/redis.service';
import { PrivateItemsController } from './private-items.controller';

@Module({
  controllers: [PrivateItemsController],
  providers: [RedisService, RateLimitService]
})
export class PrivateItemsModule {}
