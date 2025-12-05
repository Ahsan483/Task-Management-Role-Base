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
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';
let OrganizationsService = class OrganizationsService {
    constructor(organizationsRepository) {
        this.organizationsRepository = organizationsRepository;
    }
    async findAll() {
        return this.organizationsRepository.find({
            relations: ['users', 'tasks'],
        });
    }
    async findById(id) {
        const org = await this.organizationsRepository.findOne({
            where: { id },
            relations: ['users', 'tasks'],
        });
        if (!org) {
            throw new NotFoundException('Organization not found');
        }
        return org;
    }
    async create(data) {
        const existingOrg = await this.organizationsRepository.findOne({
            where: { name: data.name },
        });
        if (existingOrg) {
            throw new ConflictException('Organization with this name already exists');
        }
        const org = this.organizationsRepository.create(data);
        return this.organizationsRepository.save(org);
    }
    async update(id, data) {
        await this.organizationsRepository.update(id, data);
        return this.findById(id);
    }
    async delete(id) {
        await this.organizationsRepository.delete(id);
    }
};
OrganizationsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Organization)),
    __metadata("design:paramtypes", [Repository])
], OrganizationsService);
export { OrganizationsService };
