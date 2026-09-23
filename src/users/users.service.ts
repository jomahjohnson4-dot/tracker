import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(name: string, email: string, passwordPlain: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwordPlain, saltRounds);

    return this.prisma.db.orm.public.User.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  async login(email: string, passwordPlain: string) {
    const users = await this.prisma.db.orm.public.User.all();
    const user = users.find((u: any) => u.email === email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Cast user.password explicitly as string to satisfy bcrypt.compare typing
    const isValid = await bcrypt.compare(passwordPlain, user.password as string);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getAllUsers() {
    return this.prisma.db.orm.public.User.all();
  }
}