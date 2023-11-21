import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  public signUp() {
    return this.authService.signUp();
  }

  @Post('signin')
  public signIn() {
    return this.authService.signIn();
  }
}
