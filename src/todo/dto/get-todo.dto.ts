
import { IsOptional } from 'class-validator';

export class getTodoDto {
  @IsOptional()
  n : number;
  @IsOptional()
  from : number; 
  
}