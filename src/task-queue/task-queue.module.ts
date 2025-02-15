import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TaskQueueProccessor } from './task-queue.processor';
import { TaskQueueService } from './task-queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'task-queue',
    }),
    BullModule.registerQueue({
      name: 'DLQ',
    }),
  ],
  providers: [TaskQueueService, TaskQueueProccessor],
  exports: [TaskQueueService, TaskQueueProccessor],
})
export class TaskQueueModule {}
