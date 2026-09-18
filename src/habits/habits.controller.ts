import { Controller, Get, Post, Body } from '@nestjs/common';
import { HabitsService } from './habits.service.js';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  async create(
    @Body('userId') userId: number,
    @Body('title') title: string,
    @Body('description') description?: string,
  ) {
    return this.habitsService.createHabit(Number(userId), title, description);
  }

  @Get()
  async findAll() {
    return this.habitsService.getAllHabits();
  }
}