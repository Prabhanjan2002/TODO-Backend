// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error('DATABASE_URL environment variable is not set.');
}

@Module({
  imports: [MongooseModule.forRoot(dbUrl), TodosModule],
})
export class AppModule {}
