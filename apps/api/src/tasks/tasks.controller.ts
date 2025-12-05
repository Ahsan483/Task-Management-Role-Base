import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/decorators';
import { TaskStatus } from './task.entity';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(@CurrentUser() user: any) {
    return this.tasksService.findAll(user.userId, user.role, user.organizationId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @CurrentUser() user: any) {
    return this.tasksService.findById(id, user.userId, user.role, user.organizationId);
  }

  @Post()
  async create(
    @Body() body: { title: string; description: string; category?: string; status?: TaskStatus },
    @CurrentUser() user: any,
  ) {
    return this.tasksService.create(body, user.userId, user.organizationId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: any,
    @CurrentUser() user: any,
  ) {
    return this.tasksService.update(id, body, user.userId, user.role, user.organizationId);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @CurrentUser() user: any) {
    await this.tasksService.delete(id, user.userId, user.role, user.organizationId);
    return { message: 'Task deleted successfully' };
  }

  @Put(':id/status')
  async changeStatus(
    @Param('id') id: number,
    @Body() body: { status: TaskStatus },
    @CurrentUser() user: any,
  ) {
    return this.tasksService.changeStatus(id, body.status, user.userId, user.role, user.organizationId);
  }

  @Put('reorder')
  async reorder(
    @Body() body: { taskIds: number[] },
    @CurrentUser() user: any,
  ) {
    return this.tasksService.reorder(body.taskIds, user.userId, user.role, user.organizationId);
  }
}
