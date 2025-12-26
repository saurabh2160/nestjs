import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateNewTaskDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsArray()
    assignee:[];
}

export class UpdateTaskDto{
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsString()
    description?: string | 'No description';

    @IsString()
    @IsNotEmpty()
    status?: string;

    @IsArray()
    assignee?:[];

}