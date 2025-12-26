import { Inject, Injectable, InternalServerErrorException,ForbiddenException } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { v7 as uuidv7 } from 'uuid';



@Injectable()
export class TasksService {
    private collection;
    constructor(@Inject('MONGO_CLIENT') private readonly client: MongoClient) {
        this.collection = this.client.db('tasksDB').collection('task_collection');
    }
    async getTasks() {
        try {
            const result = await this.collection.find().toArray();
            if (!result) {
                throw new InternalServerErrorException('Server Failure, Not able to fetch tasks at the moment');
            }
            return { statusCode: 200, message: "Tasks fetched", tasks: result };
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException("Internal server error");
        }
    }
    async addNewTask(task: object, userId: string) {
        try {
            task['creator'] = userId;
            task['createdAt'] = new Date();
            task['taskId'] = uuidv7();
            const result = await this.collection.insertOne(task);
            if (!result.acknowledged) {
                throw new InternalServerErrorException('Server Failure, Task not added');
            }
            return { statusCode: 201, message: "Task added", task_id: task['_id'] };
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException("Internal server error");
        }

    }
    async updateTask(taskId: string, task: object) {
        try {
            const result = await this.collection.updateOne({ _id: new ObjectId(taskId)}, { $set: {...task,updatedAt:new Date()} });
            if (result.modifiedCount === 0) {
                throw new ForbiddenException(
                    'Task not found or you are not allowed to update it',
                )
            }
            return { statusCode: 200, message: "Task updated" };
        } catch (err) {
            console.log(err)
            throw new InternalServerErrorException("Internal server error")
        }
    }
    async deleteTask(userId: string, taskId: string) {
        try {
            const result = await this.collection.deleteOne({ _id: new ObjectId(taskId), creator: userId })
            if (result.deletedCount === 0) {
                throw new ForbiddenException(
                    'Task not found or you are not allowed to delete it',
                );
            }
            return { statusCode: 200, message: "Task deleted" };
        } catch (err) {

        }
    }
}
