import { IsString, IsOptional, IsDateString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(1, { message: 'title is required' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
  @IsDateString()
    dueDate: string; // ISO date
  }