import { Type } from 'class-transformer';
import {  IsOptional, MaxDate,IsDate, MinDate} from 'class-validator';

export class DatesDto {
  @IsOptional()
  @Type(() => Date )
  @IsDate()

 // @MinDate(fin)
  debut: Date;
  @IsOptional()
  @Type(() => Date )
  @IsDate()
  //@MaxDate(DatesDto.debut)
  fin: Date;
}
