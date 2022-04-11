import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { Skill } from '../entities/skill.entity';
import { CreateCvDto } from './create-cv.dto';

export class UpdateUserDto extends PartialType(CreateCvDto) {
    @Optional()
    username: string;
    @Optional()
    email: string;
    @Optional()
    password: string;
    @Optional()
    skill : Skill;
}
