import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  public signUp() {
    return { msg: 'Hello, World!' };
  }

  public signIn() {
    return { msg: 'Hello, Bruno!' };
  }
}
