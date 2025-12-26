import { Controller, Get, UseGuards, Request, Post, InternalServerErrorException, Body, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateNewTaskDto,UpdateTaskDto } from '../auth/dto/task.dto';
import { Roles } from 'src/auth/dto/roles.decorator';
import { Role } from 'src/user/user.types';
import { RolesGuard } from 'src/auth/roles.guard';



@Controller()
export class TasksController {
    constructor(private readonly task: TasksService) { }
    @UseGuards(AuthGuard)
    @Get('task')
    async getTasks() {
        try {
            const result = await this.task.getTasks();
            if(result && result.hasOwnProperty('statusCode') && result['statusCode'] === 200){
                return result;
            }
            throw result;
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException(err);
        }
    }

    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Creator , Role.Admin)
    @Post('addnewtask')
    async addNewTask(@Request() req, @Body() addTask:CreateNewTaskDto) {
        try {
            const userId = req.user['sub'];
            const result = await this.task.addNewTask(addTask,userId);
            if (result && result.hasOwnProperty('statusCode') && result['statusCode'] === 201) {
                return result;
            }
            throw result;
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException(err);
        }
    }

    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Creator , Role.Admin)
    @Post('updatetask')
    async updateTask(@Request() req, @Body() task:UpdateTaskDto,@Query('taskId') taskId:string){
        try{
            const result = await this.task.updateTask(taskId,task);
            if(result && result.hasOwnProperty('statusCode') && result.statusCode == 200){
                return result;
            }
            throw result;
        }catch(err){
            console.log(err);
            throw new InternalServerErrorException(err);
        }
    }

    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Creator , Role.Admin)
    @Delete('deletetask')
    async deleteTask(@Request() req, @Query('taskId') taskId:string){
        try {
            const userId = req.user['sub'];
            const result = await this.task.deleteTask(userId,taskId);
            if(result && result.hasOwnProperty('statusCode') &&result.statusCode == 200){
                return result;
            }
            throw result;
        }catch(err){
            console.log(err);
            throw new InternalServerErrorException(err);
        }
    }
}   
