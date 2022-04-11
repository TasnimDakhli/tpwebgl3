import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { resourceLimits } from 'worker_threads';
import { CreateCvDto } from './dto/create-cv.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Cv } from './entities/cv.entity';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
  ) {}
  create(createUserDto: CreateUserDto):Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async findAll():Promise<User[]> {
     const result = await this.userRepository
      .createQueryBuilder("user").getMany();

    return result;
  }

  async findOne(id: string) {
    const result = await this.userRepository
    .createQueryBuilder("user")
    .where("user.id = :id",{id: id}).getOne();
return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto):Promise<User> {
    const newUser = await this.userRepository.preload({ id, ...updateUserDto });
    if (newUser) {
      return this.userRepository.save(newUser);
    } else {
      throw new NotFoundException(`Le user d'id ${id} n'existe pas `);
    }
  }

 

  async addCv(id: string, createCvDto: CreateCvDto):Promise<Cv> {
    const user =  await this.findOne(id);
    createCvDto.userId=id;
    const newCv = await this.cvRepository.save(createCvDto);
    if (!Array.isArray(user.cvs)) {
      user.cvs = [];
  }
    user.cvs.push(newCv);
    return newCv;
  }

  async remove(id: string):Promise<DeleteResult> {
    const result = await this.userRepository.delete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }
}
