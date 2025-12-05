"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("../users/user.entity");
const audit_service_1 = require("../audit/audit.service");
let TasksService = class TasksService {
    constructor(tasksRepository, auditService) {
        this.tasksRepository = tasksRepository;
        this.auditService = auditService;
    }
    async findAll(userId, userRole, organizationId) {
        // RBAC Logic:
        // Owner: can see all tasks in org
        // Admin: can see all tasks in org
        // Viewer: can only see their own tasks
        let query = this.tasksRepository
            .createQueryBuilder('task')
            .where('task.organizationId = :organizationId', { organizationId })
            .leftJoinAndSelect('task.owner', 'owner')
            .leftJoinAndSelect('task.organization', 'organization');
        if (userRole === user_entity_1.UserRole.VIEWER) {
            query = query.andWhere('task.ownerId = :userId', { userId });
        }
        return query.orderBy('task.order', 'ASC').addOrderBy('task.id', 'ASC').getMany();
    }
    async findById(taskId, userId, userRole, organizationId) {
        const task = await this.tasksRepository.findOne({
            where: { id: taskId, organizationId },
            relations: ['owner', 'organization'],
        });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        // RBAC check
        if (userRole === user_entity_1.UserRole.VIEWER && task.ownerId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to access this task');
        }
        return task;
    }
    async create(data, userId, organizationId) {
        const task = this.tasksRepository.create({
            title: data.title,
            description: data.description,
            category: data.category,
            status: data.status || task_entity_1.TaskStatus.TODO,
            ownerId: userId,
            organizationId,
        });
        const savedTask = await this.tasksRepository.save(task);
        await this.auditService.log(userId, 'CREATE', 'Task', savedTask.id, organizationId, `Created task: ${data.title}`);
        return savedTask;
    }
    async update(taskId, data, userId, userRole, organizationId) {
        const task = await this.findById(taskId, userId, userRole, organizationId);
        // RBAC: Only owner, admin, or owner can edit
        if (userRole === user_entity_1.UserRole.VIEWER && task.ownerId !== userId) {
            throw new common_1.ForbiddenException('You can only edit your own tasks');
        }
        await this.tasksRepository.update(taskId, data);
        const updatedTask = await this.findById(taskId, userId, userRole, organizationId);
        await this.auditService.log(userId, 'UPDATE', 'Task', taskId, organizationId, `Updated task: ${task.title}`);
        return updatedTask;
    }
    async delete(taskId, userId, userRole, organizationId) {
        const task = await this.findById(taskId, userId, userRole, organizationId);
        // RBAC: Only owner (or admin/owner can delete)
        if (userRole === user_entity_1.UserRole.VIEWER && task.ownerId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own tasks');
        }
        if (userRole === user_entity_1.UserRole.ADMIN || userRole === user_entity_1.UserRole.OWNER) {
            // Admins and owners can delete any task in their org
        }
        else if (userRole === user_entity_1.UserRole.VIEWER) {
            if (task.ownerId !== userId) {
                throw new common_1.ForbiddenException('You can only delete your own tasks');
            }
        }
        await this.tasksRepository.delete(taskId);
        await this.auditService.log(userId, 'DELETE', 'Task', taskId, organizationId, `Deleted task: ${task.title}`);
    }
    async changeStatus(taskId, status, userId, userRole, organizationId) {
        const task = await this.findById(taskId, userId, userRole, organizationId);
        if (userRole === user_entity_1.UserRole.VIEWER && task.ownerId !== userId) {
            throw new common_1.ForbiddenException('You can only change status of your own tasks');
        }
        await this.tasksRepository.update(taskId, { status });
        await this.auditService.log(userId, 'UPDATE', 'Task', taskId, organizationId, `Changed task status to: ${status}`);
        return this.findById(taskId, userId, userRole, organizationId);
    }
    async reorder(taskIds, userId, userRole, organizationId) {
        for (let i = 0; i < taskIds.length; i++) {
            await this.tasksRepository.update(taskIds[i], { order: i });
        }
        return this.findAll(userId, userRole, organizationId);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        audit_service_1.AuditService])
], TasksService);
