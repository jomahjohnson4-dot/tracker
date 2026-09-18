import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import contractJson from './contract.json' with { type: 'json' };

@Injectable()
export class PrismaService {
  public db = postgres({
    contractJson,
    url: process.env['DATABASE_URL']!,
  });
}