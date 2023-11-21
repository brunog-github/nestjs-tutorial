import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  public signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @Post('signin')
  public signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }
}
