import { PartialType } from '@nestjs/mapped-types';
import { CreateCvDto } from './create-cv.dto';

export class UpdateSkillDto extends PartialType(CreateCvDto) {
    
}
