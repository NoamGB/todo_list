import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entity/tasks.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<{ message: string,data: Task[] }> {
    const tasks = await this.taskRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return { message: 'Tasks found successfully', data: tasks };
  }

  async findOne(id: number): Promise<{ message: string,data: Task | null }> {
    const verifyTask = await this.taskRepository.findOneBy({ id });
    if (!verifyTask) {
      throw new NotFoundException('Task not found');
    }
    return { message: 'Task found successfully', data: verifyTask };
  }

  async create(dto: CreateTaskDto): Promise<{ message: string; data: Task }> {
    const exist = await this.taskRepository.findOne({ where: { title: dto.title } });
    if (exist) throw new BadRequestException('Task already exists');

    if (dto.dueDate) {
      const dueDate = new Date(dto.dueDate);
      console.log(dueDate);
      console.log(new Date());
      if (dueDate < new Date()) throw new BadRequestException('Due date must be in the future');
    }

    const task = this.taskRepository.create(dto);
    const newTask = await this.taskRepository.save(task);

    return { message: 'Task created successfully', data: newTask };
  }


  async update(id: number, dto: UpdateTaskDto): Promise<{ message: string; data: Task }> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (dto.title && dto.title !== task.title) {
      const exist = await this.taskRepository.findOne({ where: { title: dto.title } });
      if (exist) throw new BadRequestException('Task title already exists');
    }

    const updatedTask = this.taskRepository.merge(task, dto);
    await this.taskRepository.save(updatedTask);

    return { message: 'Task updated successfully', data: updatedTask };
  }


  async delete(id: number): Promise<{ message: string,data: Task | null }> {
    const verifyTask = await this.taskRepository.findOneBy({ id });
    if (!verifyTask) {
      throw new NotFoundException('Task not found');
    }
    await this.taskRepository.delete(id);
    return { message: 'Task deleted successfully', data: null };
  }
}
