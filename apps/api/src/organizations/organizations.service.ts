import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
  ) {}

  async findAll(): Promise<Organization[]> {
    return this.organizationsRepository.find({
      relations: ['users', 'tasks'],
    });
  }

  async findById(id: number): Promise<Organization> {
    const org = await this.organizationsRepository.findOne({
      where: { id },
      relations: ['users', 'tasks'],
    });

    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    return org;
  }

  async create(data: { name: string; description?: string }): Promise<Organization> {
    const existingOrg = await this.organizationsRepository.findOne({
      where: { name: data.name },
    });

    if (existingOrg) {
      throw new ConflictException('Organization with this name already exists');
    }

    const org = this.organizationsRepository.create(data);
    return this.organizationsRepository.save(org);
  }

  async update(id: number, data: Partial<Organization>): Promise<Organization> {
    await this.organizationsRepository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.organizationsRepository.delete(id);
  }
}
