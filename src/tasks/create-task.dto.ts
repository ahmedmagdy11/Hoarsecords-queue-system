import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsObject()
  payload: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  visibility_time: Date;
}
