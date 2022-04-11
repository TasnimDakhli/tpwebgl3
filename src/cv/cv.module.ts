import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { User } from './entities/user.entity';
import { Skill } from './entities/skill.entity';

@Module({
  controllers: [CvController],
  imports: [TypeOrmModule.forFeature([Cv,User,Skill])],
  providers: [CvService]
})
export class CvModule {}
