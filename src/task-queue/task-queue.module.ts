import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TaskQueueProccessor } from './task-queue.processor';
import { TaskQueueService } from './task-queue.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
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
