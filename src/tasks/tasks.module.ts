import { Module } from '@nestjs/common';
import { TaskQueueModule } from 'src/task-queue/task-queue.module';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TaskQueueModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
