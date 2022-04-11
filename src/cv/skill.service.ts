import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { resourceLimits } from 'worker_threads';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}
  create(createSkillDto: CreateSkillDto):Promise<Skill> {
    return this.skillRepository.save(createSkillDto);
  }

  async findAll():Promise<Skill[]> {
     const result = await this.skillRepository
      .createQueryBuilder("skill").getMany();

    return result;
  }

  async findOne(id: string) {
    const result = await this.skillRepository
    .createQueryBuilder("skill")
    .where("skill.id = :id",{id: id}).getOne();
return result;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto):Promise<Skill> {
    const newSkill = await this.skillRepository.preload({ id, ...updateSkillDto });
    if (newSkill) {
      return this.skillRepository.save(newSkill);
    } else {
      throw new NotFoundException(`Le skill d'id ${id} n'existe pas `);
    }
  }

  async remove(id: string):Promise<DeleteResult> {
    const result = await this.skillRepository.delete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }
}
