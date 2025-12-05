import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles, CurrentUser } from '../auth/decorators';
import { UserRole } from '../users/user.entity';
import { AuditService } from './audit.service';

@Controller('audit-log')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Get()
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  async getLogs(@CurrentUser() user: any) {
    return this.auditService.getLogsForOrganization(user.organizationId);
  }
}
