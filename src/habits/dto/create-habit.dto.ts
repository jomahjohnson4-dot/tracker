import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHabitDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}