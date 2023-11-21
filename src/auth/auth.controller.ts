import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  public signUp() {
    return 'I am signed up';
  }

  @Post('signin')
  public signIn() {
    return 'I am signin in';
  }
}
