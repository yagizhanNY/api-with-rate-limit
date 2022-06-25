import { Controller, Get, HttpException, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { RateLimitService } from 'src/services/rate-limit/rate-limit.service';

@Controller('private-items')
export class PrivateItemsController {

    constructor(private rateLimitService: RateLimitService){}

    @Get()
    async getPrivateItems(@Req() req: Request, @Res() res: Response) {
        const token = req.headers["Token"] as string;
        const response = await this.rateLimitService.checkRateLimit(token);
        res.statusCode = response.statusCode;
        
        return res.json({
            response: response.message
        });
    }
}
