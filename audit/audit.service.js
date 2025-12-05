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
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';
let AuditService = class AuditService {
    constructor(auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }
    async log(userId, action, resource, resourceId, organizationId, details) {
        const auditLog = this.auditLogRepository.create({
            userId,
            action,
            resource,
            resourceId,
            organizationId,
            details,
        });
        await this.auditLogRepository.save(auditLog);
    }
    async getLogs(organizationId, limit = 100) {
        return this.auditLogRepository.find({
            where: { organizationId },
            relations: ['user'],
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async getLogsForOrganization(organizationId) {
        return this.auditLogRepository.find({
            where: { organizationId },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }
};
AuditService = __decorate([
    Injectable(),
    __param(0, InjectRepository(AuditLog)),
    __metadata("design:paramtypes", [Repository])
], AuditService);
export { AuditService };
