import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { DatabaseModule } from 'src/databaseproviders/db.module';
import { TasksController } from './tasks.controller';

@Module({
    imports: [DatabaseModule],
    exports: [TasksService],
    providers: [
        TasksService,
    ],
    controllers: [TasksController]
})
export class TasksModule { }
