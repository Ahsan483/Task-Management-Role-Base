import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { User, UserRole } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.seedOrganizations();
    await this.seedUsers();
  }

  private async seedOrganizations() {
    const count = await this.organizationRepository.count();
    
    if (count === 0) {
      const organizations = [
        { id: 1, name: 'Default Organization', description: 'Default organization for testing' },
        { id: 2, name: 'Tech Team', description: 'Technology team organization' },
      ];

      for (const org of organizations) {
        await this.organizationRepository.save(org);
      }

      console.log('✓ Database seeded with default organizations');
    }
  }

  private async seedUsers() {
    const count = await this.userRepository.count();
    
    if (count === 0) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      const users = [
        {
          name: 'Owner User',
          email: 'owner@example.com',
          password: hashedPassword,
          role: UserRole.OWNER,
          organizationId: 1,
        },
        {
          name: 'Admin User',
          email: 'admin@example.com',
          password: hashedPassword,
          role: UserRole.ADMIN,
          organizationId: 1,
        },
        {
          name: 'Viewer User',
          email: 'viewer@example.com',
          password: hashedPassword,
          role: UserRole.VIEWER,
          organizationId: 1,
        },
      ];

      for (const user of users) {
        await this.userRepository.save(user);
      }

      console.log('✓ Database seeded with test users (owner, admin, viewer)');
    }
  }
}

