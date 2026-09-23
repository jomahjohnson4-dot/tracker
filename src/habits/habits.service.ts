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

  async logHabitCompletion(habitId: number, date: string) {
    return this.prisma.db.orm.public.HabitLog.create({
      habitId,
      date,
    });
  }

  async getHabitLogs() {
    return this.prisma.db.orm.public.HabitLog.all();
  }

  async getHabitStreak(habitId: number) {
    const logs = await this.prisma.db.orm.public.HabitLog.all();
    const habitLogs = logs
      .filter((log: any) => log.habitId === Number(habitId))
      .map((log: any) => log.date)
      .sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime());

    if (habitLogs.length === 0) return { habitId, currentStreak: 0 };

    let streak = 0;
    let expectedDate = new Date();
    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    if (!habitLogs.includes(formatDate(expectedDate))) {
      expectedDate.setDate(expectedDate.getDate() - 1);
    }

    for (const logDate of habitLogs) {
      if (logDate === formatDate(expectedDate)) {
        streak++;
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        break;
      }
    }

    return { habitId, currentStreak: streak };
  }
}