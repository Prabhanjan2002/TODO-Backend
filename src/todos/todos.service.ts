// src/todos/todos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  // CREATE a new To-Do
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    return createdTodo.save();
  }

  // READ all To-Dos
  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  // READ a single To-Do by ID
  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    return todo;
  }

  // UPDATE a To-Do
  async update(id: string, updateTodoDto: Partial<Todo>): Promise<Todo> {
    const existingTodo = await this.todoModel
      .findByIdAndUpdate(id, updateTodoDto, { new: true })
      .exec();
    if (!existingTodo) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    return existingTodo;
  }

  // DELETE a To-Do
  async remove(id: string): Promise<any> {
    const result = await this.todoModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    return { message: 'Todo successfully deleted' };
  }
}
