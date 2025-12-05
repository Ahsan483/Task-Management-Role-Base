import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
      const decoded = this.jwtService.verify(token, { secret }) as any;
      // Normalize to expected shape used across the app
      req['user'] = {
        userId: decoded.sub ?? decoded.userId ?? null,
        email: decoded.email ?? null,
        role: decoded.role ?? null,
        organizationId: decoded.organizationId ?? decoded.orgId ?? null,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
