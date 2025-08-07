// src/todos/todos.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './schemas/todo.schema';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: Partial<Todo>,
  ): Promise<Todo> {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.todosService.remove(id);
  }
}
