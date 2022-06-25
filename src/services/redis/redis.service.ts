import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    private readonly client: Redis;

    constructor() {
        const host = process.env.NODE_ENV === 'production' ? 'redis' : 'localhost';
        const port = 6379;

        this.client = new Redis({
            host: host,
            port: port
        });
    }

    public async increase(key: string) {
        return await this.client.incr(key);
    }

    public async expire(key: string, interval: number){
        this.client.expire(key, interval);
    }

    public async getExpireDate(key: string) {
        return await this.client.expiretime(key);
    }
}
