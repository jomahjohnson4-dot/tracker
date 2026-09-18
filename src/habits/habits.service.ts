import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class HabitsService {
  constructor(private prisma: PrismaService) {}

  async createHabit(userId: number, title: string, description?: string) {
    return this.prisma.db.orm.public.Habit.create({
      title,
      description,
      userId,
    });
  }

  async getAllHabits() {
    return this.prisma.db.orm.public.Habit.all();
  }
}