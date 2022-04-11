import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { Skill } from './entities/skill.entity';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  create(@Body() createCvDto: CreateCvDto):Promise<Cv> {
    return this.cvService.create(createCvDto);
  }

  @Get()
  findAll():Promise<Cv[]> {
    return this.cvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(id);
  }
/*
  @Post(':id')
  addSkill(@Param('id') id: string, @Body() createSkillDto: CreateSkillDto): Promise<Skill> {
    return this.cvService.addSkill(id, createSkillDto);
  }*/

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto): Promise<Cv> {
    return this.cvService.update(id, updateCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<DeleteResult> {
    return this.cvService.remove(id);
  }
}
