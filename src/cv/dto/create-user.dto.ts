import { IsNotEmpty, IsNumber, IsOptional, Max, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  
}
