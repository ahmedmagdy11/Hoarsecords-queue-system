import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './create-task.dto';

@Controller()
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
    await this.taskService.deleteFromDLQ();
    return {
      status: 'DLQ cleared',
    };
  }
}
