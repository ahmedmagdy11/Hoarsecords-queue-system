import { Injectable } from '@nestjs/common';
import { TaskQueueService } from 'src/task-queue/task-queue.service';
import { CreateTaskDTO } from './create-task.dto';
import { Job } from 'bullmq';

@Injectable()
export class TasksService {
  constructor(private taskQueueService: TaskQueueService) {}

  async createTask(
    body: CreateTaskDTO,
  ): Promise<{ id: string; status: string }> {
    const job = await this.taskQueueService.addTask(body);
    return { id: job.id, status: 'task added successfully' };
  }

  async getDLQ(): Promise<
    {
      id: string;
      type: string;
      payload: object;
      error: string;
    }[]
  > {
    const data = await this.taskQueueService.getDlq();
    return data.map((job: Job) => {
      return {
        id: job.data.id,
        payload: job.data.data,
        type: job.data.name,
        error: job.data.failedReason,
      };
    });
  }

  async deleteFromDLQ() {
    return this.taskQueueService.deleteFromDlq();
  }
}
