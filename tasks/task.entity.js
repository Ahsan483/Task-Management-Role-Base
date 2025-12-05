var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Organization } from '../organizations/organization.entity';
export var TaskStatus;
(function (TaskStatus) {
    TaskStatus["TODO"] = "Todo";
    TaskStatus["IN_PROGRESS"] = "InProgress";
    TaskStatus["DONE"] = "Done";
})(TaskStatus || (TaskStatus = {}));
let Task = class Task {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Task.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    Column({ type: 'varchar', default: TaskStatus.TODO }),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "category", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], Task.prototype, "order", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.createdTasks, { eager: true }),
    __metadata("design:type", User)
], Task.prototype, "owner", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Task.prototype, "ownerId", void 0);
__decorate([
    ManyToOne(() => Organization, (org) => org.tasks, { eager: true }),
    __metadata("design:type", Organization)
], Task.prototype, "organization", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Task.prototype, "organizationId", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Task.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Task.prototype, "updatedAt", void 0);
Task = __decorate([
    Entity('tasks')
], Task);
export { Task };
