import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { User } from './entities/user.entity';
import { Skill } from './entities/skill.entity';

@Module({
  controllers: [SkillController],
  imports: [TypeOrmModule.forFeature([Skill,User,Skill])],
  providers: [SkillService]
})
export class SkillModule {}
