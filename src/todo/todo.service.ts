import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from "typeorm";
import { TodoEntity } from './Entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTodoDto } from './update-todo.dto';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { SearchTodoDto } from './dto/search-todo.dto';
import { getTodoDto } from './dto/get-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  addTodo(todo: Partial<TodoEntity>): Promise<TodoEntity> {
    return this.todoRepository.save(todo);
  }

  async updateTodo(
    updateTodoDto: UpdateTodoDto,
    id: string,
  ): Promise<TodoEntity> {
    const newTodo = await this.todoRepository.preload({ id, ...updateTodoDto });
    if (newTodo) {
      return this.todoRepository.save(newTodo);
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
    }
  }

  async deleteTodo(id: string): Promise<DeleteResult> {
    const result = await this.todoRepository.delete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }
  async softDeleteTodo(id: string): Promise<UpdateResult> {
    const result = await this.todoRepository.softDelete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  async softRestoreTodo(id: string) {
    const result = await this.todoRepository.restore(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  findAll(searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    const criterias = [];
    if (searchTodoDto.status) {
      criterias.push({ status: searchTodoDto.status });
    }
    if (searchTodoDto.criteria) {
      criterias.push({ name: Like(`%${searchTodoDto.criteria}%`) });
      criterias.push({ description: Like(`%${searchTodoDto.criteria}%`) });
    }
    if (criterias.length) {
      return this.todoRepository.find({ withDeleted: true, where: criterias });
    }
    return this.todoRepository.find({ withDeleted: true});
  }

  findAll2(searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    const criterias = [];
    if( (searchTodoDto.status)&&(searchTodoDto.criteria)) {
      criterias.push({ status: searchTodoDto.status , name: Like(`%${searchTodoDto.criteria}%`)});
      criterias.push({ status: searchTodoDto.status , description: Like(`%${searchTodoDto.criteria}%`)});

    }else {
    if (searchTodoDto.status) {
      criterias.push({ status: searchTodoDto.status });
    }

    if (searchTodoDto.criteria) {
      criterias.push({ name: Like(`%${searchTodoDto.criteria}%`) });
      criterias.push({ description: Like(`%${searchTodoDto.criteria}%`) });
    }}

    if (criterias.length) {
      return this.todoRepository.find({ withDeleted: true, where: criterias });
    }
    return this.todoRepository.find({ withDeleted: true});
  }


  async findAll3(searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    if( (searchTodoDto.status)&&(searchTodoDto.criteria)) {
      const result = await this.todoRepository
      .createQueryBuilder("todo")
      .where("todo.name like :name", {name: '%' + searchTodoDto.criteria + '%' })
      .orWhere("todo.description like :description", {description: '%' + searchTodoDto.criteria + '%' })
      .andWhere("todo.status = :status",{status: searchTodoDto.status})
      .getMany();
      return result;

    }else {
    if (searchTodoDto.status) {
      const result = await this.todoRepository
                        .createQueryBuilder("todo")
                        .where("todo.status = :status",{status: searchTodoDto.status}).getMany();
      return result;
    }

    if (searchTodoDto.criteria) {
      const result = await this.todoRepository
      .createQueryBuilder("todo")
      .where("todo.name like :name", {name: '%' + searchTodoDto.criteria + '%' })
      .orWhere("todo.description like :description", {description: '%' + searchTodoDto.criteria + '%' })
      .getMany();
      return result;
    }}

  }

async getAll(getTodoDto: getTodoDto ): Promise<TodoEntity[]> {
  const result = await this.todoRepository
      .createQueryBuilder("todo")
      .take(getTodoDto.n)
      .skip(getTodoDto.from)
      .getMany();
      

  return result;
}
}
