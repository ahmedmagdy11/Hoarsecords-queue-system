import { Injectable } from '@nestjs/common';
import { TaskQueueService } from 'src/task-queue/task-queue.service';
import { CreateTaskDTO } from './create-task.dto';
import { Job } from 'bullmq';

@Injectable()
export class TasksService {
  constructor(private taskQueueService: TaskQueueService) {}

  async createTask(body: CreateTaskDTO): Promise<Job> {
    const job = await this.taskQueueService.addTask(body);
    return job;
  }

  async getDLQ() {
    return this.taskQueueService.getDlq();
  }

  async deleteFromDLQ() {
    return this.taskQueueService.deleteFromDlq();
  }
}
