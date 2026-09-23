import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHabitLogDto {
  @IsNumber()
  @IsNotEmpty()
  habitId: number;

  @IsString()
  @IsNotEmpty()
  date: string; // e.g., '2026-09-23'
}