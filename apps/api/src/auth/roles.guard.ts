import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../users/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[] | string[]>('roles', context.getHandler());
    
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const userRole = user.role ? String(user.role).toLowerCase() : '';

    const normalizedRequired = (requiredRoles || []).map(r => String(r).toLowerCase());

    const hasRole = normalizedRequired.includes(userRole);

    if (!hasRole) {
      throw new ForbiddenException(`This action requires one of the following roles: ${requiredRoles?.join(', ')}`);
    }

    return true;
  }
}
