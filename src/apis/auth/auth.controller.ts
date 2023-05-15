import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { IOAuthUser } from '../users/interfaces/users-service.interface';

import { AuthService } from './auth.service';
import { DynamicAuthGuard } from './guards/dynamic-auth.guards';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @UseGuards(DynamicAuthGuard)
  @Get('/login/:social')
  async socialLogin(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.socialLogin({ req, res });
  }
}
