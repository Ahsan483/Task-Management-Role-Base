import { Controller, Get, Post, Body, Param, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CurrentUser, Roles } from '../auth/decorators';
import { UserRole } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() body: { email: string; password: string; name: string; organizationId: number },
  ) {
    return this.usersService.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('organization/members')
  @UseGuards(JwtAuthGuard)
  async findByOrganization(@CurrentUser() user: any) {
    return this.usersService.findByOrganizationId(user.organizationId);
  }

  @Put(':id/change-role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  async changeUserRole(
    @Param('id') userId: number,
    @Body() body: { role: string },
    @CurrentUser() user: any,
  ) {
    return this.usersService.update(userId, { role: body.role as UserRole });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number) {
    return this.usersService.findById(id);
  }
}
