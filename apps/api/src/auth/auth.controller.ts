import { Controller, Post, Body, Get, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { RolesGuard } from './roles.guard';
import { Roles, CurrentUser } from './decorators';
import { UserRole } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Post('register')
  async register(
    @Body() body: { email: string; password: string; name: string; organizationId: number; role?: UserRole },
  ) {
    // If no role specified, default to VIEWER
    const role = body.role || UserRole.VIEWER;
    const user = await this.authService.register(
      body.email,
      body.password,
      body.name,
      body.organizationId,
      role,
    );
    return this.authService.login(user);
  }

  @Post('register-admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  async registerAdmin(
    @Body() body: { email: string; password: string; name: string },
    @CurrentUser() owner: any,
  ) {
    // Only Owner can create admins in their organization
    const admin = await this.authService.register(
      body.email,
      body.password,
      body.name,
      owner.organizationId,
      UserRole.ADMIN,
    );
    return {
      message: 'Admin user created successfully',
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    };
  }

  @Get('organization-users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  async getOrganizationUsers(@CurrentUser() user: any) {
    // Owner and Admin can see all users in their organization
    const users = await this.usersService.findByOrganizationId(user.organizationId);
    return users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
    }));
  }

  @Post('change-user-role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  async changeUserRole(
    @Body() body: { userId: number; newRole: UserRole },
    @CurrentUser() owner: any,
  ) {
    // Only Owner can change user roles
    const user = await this.usersService.findById(body.userId);
    if (!user || user.organizationId !== owner.organizationId) {
      throw new BadRequestException('User not found in your organization');
    }
    
    // Owner cannot be changed to other roles
    if (user.role === UserRole.OWNER) {
      throw new BadRequestException('Cannot change Owner role');
    }

    await this.usersService.update(body.userId, { role: body.newRole });
    return { message: `User role changed to ${body.newRole}` };
  }
}
