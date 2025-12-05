import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async log(userId: number, action: string, resource: string, resourceId: number, organizationId: number, details?: string) {
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

  async getLogs(organizationId: number, limit: number = 100) {
    return this.auditLogRepository.find({
      where: { organizationId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async getLogsForOrganization(organizationId: number) {
    return this.auditLogRepository.find({
      where: { organizationId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}
