import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {Cv} from './entities/cv.entity';
import { Skill } from './entities/skill.entity';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User,Cv,Skill])],
  providers: [UserService]
})
export class UserModule {}
