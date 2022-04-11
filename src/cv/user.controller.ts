import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateCvDto } from './dto/create-cv.dto';
import { Cv } from './entities/cv.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto):Promise<User> {
    return this.userService.create(createUserDto);
  }
  @Post('cv/:id')
  addCv(@Param('id') id: string, @Body() createCvDto: CreateCvDto): Promise<Cv> {
    return this.userService.addCv(id, createCvDto);
  }

  @Get()
  findAll():Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<DeleteResult> {
    return this.userService.remove(id);
  }
}
