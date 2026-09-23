import { Module } from '@nestjs/common';
import { HabitsController } from './habits.controller.js';
import { HabitsService } from './habits.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule {}