var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { Task } from '../tasks/task.entity';
import { AuditLog } from '../audit/audit-log.entity';
export var UserRole;
(function (UserRole) {
    UserRole["OWNER"] = "Owner";
    UserRole["ADMIN"] = "Admin";
    UserRole["VIEWER"] = "Viewer";
})(UserRole || (UserRole = {}));
let User = class User {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column({ type: 'varchar', default: UserRole.VIEWER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    ManyToOne(() => Organization, (org) => org.users, { eager: true }),
    __metadata("design:type", Organization)
], User.prototype, "organization", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], User.prototype, "organizationId", void 0);
__decorate([
    OneToMany(() => Task, (task) => task.owner),
    __metadata("design:type", Array)
], User.prototype, "createdTasks", void 0);
__decorate([
    OneToMany(() => AuditLog, (log) => log.user),
    __metadata("design:type", Array)
], User.prototype, "auditLogs", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    Entity('users')
], User);
export { User };
