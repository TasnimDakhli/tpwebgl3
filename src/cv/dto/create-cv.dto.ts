import { IsNotEmpty, IsNumber, IsOptional, Max, MaxLength } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateCvDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  firstname: string;
  @IsOptional()
  @IsNumber()
  age: number;
  @IsOptional()
  @IsNumber()
  @MaxLength(8)
  cin: number;
  @IsOptional()
  job: string;
  @IsNotEmpty()
  path: string;
  @IsOptional()
  userId : string;

}
