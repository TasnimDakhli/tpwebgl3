import { IsNotEmpty, IsNumber, IsOptional, Max, MaxLength } from "class-validator";

export class CreateSkillDto {
  @IsNotEmpty()
  description: string;
  
}
