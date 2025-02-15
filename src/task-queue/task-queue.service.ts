import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { CreateTaskDTO } from 'src/tasks/create-task.dto';

@Injectable()
export class TaskQueueService {
  constructor(
    @InjectQueue('task-queue') private taskQueue: Queue,
    @InjectQueue('DLQ') private DLQ: Queue,
    private configService: ConfigService,
  ) {}
  async addTask(body: CreateTaskDTO) {
    const delay = body.visibility_time
      ? new Date(body.visibility_time).getTime() - Date.now()
      : 0;

    const job = await this.taskQueue.add(body.type, body.payload, {
      delay: delay,
      attempts: parseInt(this.configService.get('MAX_RETRIES') ?? '2'),
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
