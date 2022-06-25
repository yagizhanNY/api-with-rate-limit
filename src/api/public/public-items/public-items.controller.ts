import { Controller, Get, HttpException, HttpStatus, Ip, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { RateLimitService } from 'src/services/rate-limit/rate-limit.service';

@Controller('public-items')
export class PublicItemsController {

    constructor(private rateLimitService: RateLimitService){}

    @Get()
    async getPublicItems(@Res() res: Response, @Ip() ipAddress: string) {
        
        const response = await this.rateLimitService.checkRateLimit(ipAddress);
        res.statusCode = response.statusCode;
        
        return res.json({
            response: response.message
        });
    }
}
