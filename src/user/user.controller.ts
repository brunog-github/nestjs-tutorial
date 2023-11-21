import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('api/v1/users')
export class UserController {
  @Get('profile')
  public getProfile(@GetUser() user: User) {
    return user;
  }
}
