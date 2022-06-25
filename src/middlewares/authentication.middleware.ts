import { HttpException, HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService){}
  use(req: Request, res: Response, next: NextFunction) {

    const token = this.configService.get<string>('TOKEN');

    if(req.headers.token === token) {
      next();
    }
    else {
      throw new HttpException('Authentication Error!', HttpStatus.UNAUTHORIZED);
    }
  }
}
