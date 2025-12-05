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
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findAll() {
        return this.usersRepository.find({ relations: ['organization'] });
    }
    async findById(id) {
        return this.usersRepository.findOne({
            where: { id },
            relations: ['organization'],
        });
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({
            where: { email },
            relations: ['organization'],
        });
    }
    async findByOrganizationId(organizationId) {
        return this.usersRepository.find({
            where: { organizationId },
            relations: ['organization'],
        });
    }
    async create(data) {
        const existingUser = await this.findByEmail(data.email);
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = this.usersRepository.create({
            email: data.email,
            password: hashedPassword,
            name: data.name,
            organizationId: data.organizationId,
            role: data.role || UserRole.VIEWER,
        });
        return this.usersRepository.save(user);
    }
    async update(id, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        await this.usersRepository.update(id, data);
        return this.findById(id);
    }
    async delete(id) {
        await this.usersRepository.delete(id);
    }
};
UsersService = __decorate([
    Injectable(),
    __param(0, InjectRepository(User)),
    __metadata("design:paramtypes", [Repository])
], UsersService);
export { UsersService };
