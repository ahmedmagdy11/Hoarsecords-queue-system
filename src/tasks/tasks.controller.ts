import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  async create(@Body() body: CreateTaskDTO) {
    return await this.taskService.createTask(body);
  }

  @Get('dlq')
  async getDLQ() {
    return await this.taskService.getDLQ();
  }

  @Delete('dlq')
  async deleteDlq() {
    return await this.taskService.deleteFromDLQ();
  }
}
