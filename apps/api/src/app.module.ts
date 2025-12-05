import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { AuditModule } from './audit/audit.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { Task } from './tasks/task.entity';
import { Organization } from './organizations/organization.entity';
import { User } from './users/user.entity';
import { AuditLog } from './audit/audit-log.entity';
import { SeedService } from './database/seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Task, Organization, AuditLog],
      synchronize: true,
      logging: false,
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      signOptions: { expiresIn: '24h' },
    }),
    AuthModule,
    UsersModule,
    TasksModule,
    AuditModule,
    OrganizationsModule,
    TypeOrmModule.forFeature([Organization, User]),
  ],
  providers: [SeedService],
})
export class AppModule {}
