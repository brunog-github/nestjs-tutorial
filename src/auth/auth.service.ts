import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  public async signUp(dto: AuthDto) {
    const password = await argon.hash(dto.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          password: password,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      delete user.password;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  public async signIn(dto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await argon.verify(user.password, dto.password);

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    delete user.password;

    return user;
  }
}
