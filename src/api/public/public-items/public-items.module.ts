import { Module } from '@nestjs/common';
import { RateLimitService } from 'src/services/rate-limit/rate-limit.service';
import { RedisService } from 'src/services/redis/redis.service';
import { PublicItemsController } from './public-items.controller';

@Module({
  controllers: [PublicItemsController],
  providers: [RedisService, RateLimitService]
})
export class PublicItemsModule {}
