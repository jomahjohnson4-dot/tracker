import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { HabitsService } from './habits.service.js';
import { CreateHabitDto } from './dto/create-habit.dto.js';
import { CreateHabitLogDto } from './dto/create-habit-log.dto.js';
import { JwtAuthGuard } from '../users/jwt-auth.guard.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  async create(@Body() createHabitDto: CreateHabitDto) {
    return this.habitsService.createHabit(
      createHabitDto.userId,
      createHabitDto.title,
      createHabitDto.description,
    );
  }

  @Get()
  async findAll() {
    return this.habitsService.getAllHabits();
  }

  @Post('logs')
  async logCompletion(@Body() createHabitLogDto: CreateHabitLogDto) {
    return this.habitsService.logHabitCompletion(
      createHabitLogDto.habitId,
      createHabitLogDto.date,
    );
  }

  @Get('logs')
  async findAllLogs() {
    return this.habitsService.getHabitLogs();
  }

  @Get(':id/streak')
  async getStreak(@Param('id') id: string) {
    return this.habitsService.getHabitStreak(Number(id));
  }
}