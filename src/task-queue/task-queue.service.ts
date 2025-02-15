import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { CreateTaskDTO } from 'src/tasks/create-task.dto';

@Injectable()
export class TaskQueueService {
  constructor(
    @InjectQueue('task-queue') private taskQueue: Queue,
    @InjectQueue('DLQ') private DLQ: Queue,
  ) {}
  async addTask(body: CreateTaskDTO) {
    const delay = body.visibility_time
      ? new Date(body.visibility_time).getTime() - Date.now()
      : 0;
    const job = await this.taskQueue.add(body.type, body.payload, {
      delay: delay,
      attempts: 1,
      backoff: { type: 'exponential', delay: 100 },
    });

    return job;
  }

  async getDlq() {
    return await this.DLQ.getJobs();
  }

  async deleteFromDlq() {
    return await this.DLQ.obliterate({ force: true });
  }
}
