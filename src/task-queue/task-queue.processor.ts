import {
  InjectQueue,
  OnWorkerEvent,
  Processor,
  WorkerHost,
} from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';

@Processor('task-queue')
export class TaskQueueProccessor extends WorkerHost {
  constructor(@InjectQueue('DLQ') private DLQ: Queue) {
    super();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async process(job: Job, _: any): Promise<any> {
    if (job.data?.fail) {
      throw new Error('system Error');
    }
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(`Processing job with id ${job.id}`);
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job) {
    console.log(`Job ${job.id} is in progress: ${job.progress}% completed.`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Job with id ${job.id} COMPLETED!`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.log(`Job failed with id: ${job.id}`);
    if (job.attemptsMade == 1) {
      this.DLQ.add(job.name, job);
    }
  }
}
