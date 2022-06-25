import { Injectable } from '@nestjs/common';
import { RateLimitResponse } from 'src/entities/rate-limit-response.interface';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class RateLimitService {
    constructor(private redis: RedisService){}

    async checkRateLimit(key: string, interval: number = 3600): Promise<RateLimitResponse> {
        const quantity = await this.redis.increase(key);
        const rateLimitResponse: RateLimitResponse = {
            message: "ok",
            statusCode: 200
        }

        if(quantity === 1) {
            await this.setExpireDate(key, interval);
        }

        if(quantity > Number(process.env.IP_RATE_LIMIT)) {
            const expireTime = await this.redis.getExpireDate(key)
            const humanDate = new Date(expireTime * 1000).toLocaleString();
            return {
                statusCode: 429,
                message: `Too many request. You can make the next request at ${humanDate}`
            };
        }

        return rateLimitResponse;
    }

    private async setExpireDate(key: string, interval: number) {
        await this.redis.expire(key, interval);
    }
}
