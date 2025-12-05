import { Injectable, ForbiddenException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
import { UserRole } from '../users/user.entity';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private auditService: AuditService,
  ) {}

  async findAll(userId: number, userRole: UserRole, organizationId: number): Promise<Task[]> {
    // RBAC Logic:
    // Owner: can see all tasks in org
    // Admin: can see all tasks in org
    // Viewer: can only see their own tasks

    let query = this.tasksRepository
      .createQueryBuilder('task')
      .where('task.organizationId = :organizationId', { organizationId })
      .leftJoinAndSelect('task.owner', 'owner')
      .leftJoinAndSelect('task.organization', 'organization');

    if (userRole === UserRole.VIEWER) {
      query = query.andWhere('task.ownerId = :userId', { userId });
    }

    return query.orderBy('task.order', 'ASC').addOrderBy('task.id', 'ASC').getMany();
  }

  async findById(taskId: number, userId: number, userRole: UserRole, organizationId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, organizationId },
      relations: ['owner', 'organization'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // RBAC check
    if (userRole === UserRole.VIEWER && task.ownerId !== userId) {
      throw new ForbiddenException('You do not have permission to access this task');
    }

    return task;
  }

  async create(
    data: { title: string; description: string; category?: string; status?: TaskStatus },
    userId: number,
    organizationId: number,
  ): Promise<Task> {
    if (!userId) {
      throw new InternalServerErrorException('User ID is missing from JWT token');
    }
    if (!organizationId) {
      throw new InternalServerErrorException('Organization ID is missing from JWT token');
    }

    const task = this.tasksRepository.create({
      title: data.title,
      description: data.description,
      category: data.category || 'General',
      status: data.status || TaskStatus.TODO,
      ownerId: userId,
      organizationId,
    });

    try {
      const savedTask = await this.tasksRepository.save(task);
      await this.auditService.log(userId, 'CREATE', 'Task', savedTask.id, organizationId, `Created task: ${data.title}`);
      return savedTask;
    } catch (error) {
      console.error('Error creating task:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException('Failed to create task: ' + errorMessage);
    }
  }

  async update(
    taskId: number,
    data: Partial<Task>,
    userId: number,
    userRole: UserRole,
    organizationId: number,
  ): Promise<Task> {
    const task = await this.findById(taskId, userId, userRole, organizationId);

    // RBAC: Only owner, admin, or owner can edit
    if (userRole === UserRole.VIEWER && task.ownerId !== userId) {
      throw new ForbiddenException('You can only edit your own tasks');
    }

    await this.tasksRepository.update(taskId, data);

    const updatedTask = await this.findById(taskId, userId, userRole, organizationId);
    await this.auditService.log(userId, 'UPDATE', 'Task', taskId, organizationId, `Updated task: ${task.title}`);

    return updatedTask;
  }

  async delete(
    taskId: number,
    userId: number,
    userRole: UserRole,
    organizationId: number,
  ): Promise<void> {
    const task = await this.findById(taskId, userId, userRole, organizationId);

    // RBAC: Only owner (or admin/owner can delete)
    if (userRole === UserRole.VIEWER && task.ownerId !== userId) {
      throw new ForbiddenException('You can only delete your own tasks');
    }

    if (userRole === UserRole.ADMIN || userRole === UserRole.OWNER) {
      // Admins and owners can delete any task in their org
    } else if (userRole === UserRole.VIEWER) {
      if (task.ownerId !== userId) {
        throw new ForbiddenException('You can only delete your own tasks');
      }
    }

    await this.tasksRepository.delete(taskId);
    await this.auditService.log(userId, 'DELETE', 'Task', taskId, organizationId, `Deleted task: ${task.title}`);
  }

  async changeStatus(
    taskId: number,
    status: TaskStatus,
    userId: number,
    userRole: UserRole,
    organizationId: number,
  ): Promise<Task> {
    const task = await this.findById(taskId, userId, userRole, organizationId);

    if (userRole === UserRole.VIEWER && task.ownerId !== userId) {
      throw new ForbiddenException('You can only change status of your own tasks');
    }

    await this.tasksRepository.update(taskId, { status });
    await this.auditService.log(userId, 'UPDATE', 'Task', taskId, organizationId, `Changed task status to: ${status}`);

    return this.findById(taskId, userId, userRole, organizationId);
  }

  async reorder(
    taskIds: number[],
    userId: number,
    userRole: UserRole,
    organizationId: number,
  ): Promise<Task[]> {
    for (let i = 0; i < taskIds.length; i++) {
      await this.tasksRepository.update(taskIds[i], { order: i });
    }

    return this.findAll(userId, userRole, organizationId);
  }
}
