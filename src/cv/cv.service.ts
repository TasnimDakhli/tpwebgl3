import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { resourceLimits } from 'worker_threads';
import { CreateCvDto } from './dto/create-cv.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { Skill } from './entities/skill.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}
  create(createCvDto: CreateCvDto):Promise<Cv> {
    return this.cvRepository.save(createCvDto);
  }

  async findAll():Promise<Cv[]> {
     const result = await this.cvRepository
      .createQueryBuilder("cv").getMany();

    return result;
  }

  async findOne(id: string) {
    const result = await this.cvRepository
    .createQueryBuilder("cv")
    .where("cv.id = :id",{id: id}).getOne();
return result;
  }

  async update(id: string, updateCvDto: UpdateCvDto):Promise<Cv> {
    const newCv = await this.cvRepository.preload({ id, ...updateCvDto });
    if (newCv) {
      return this.cvRepository.save(newCv);
    } else {
      throw new NotFoundException(`Le cv d'id ${id} n'existe pas `);
    }
  }
  
 /*
  async addSkill(id: string, createSkillDto: CreateSkillDto):Promise<Skill> {

    const newCv = await this.findOne(id);
    if (newCv) {
      const skill = await this.skillRepository.create(createSkillDto);
      const newCv2 = await this.update(id,new CreateCvDto({skill}));
      newCv
    } else {
      throw new NotFoundException(`Le cv d'id ${id} n'existe pas `);
    }
  }*/

  async remove(id: string):Promise<DeleteResult> {
    const result = await this.cvRepository.delete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }
}
