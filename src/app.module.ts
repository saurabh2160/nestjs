import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './databaseproviders/db.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    TasksModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: Number(process.env.TTL),
          limit: Number(process.env.LIMIT),
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
