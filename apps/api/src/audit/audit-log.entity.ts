import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.auditLogs)
  user!: User;

  @Column()
  userId!: number;

  @Column()
  action!: string; // CREATE, READ, UPDATE, DELETE

  @Column()
  resource!: string; // Task, User, Organization

  @Column()
  resourceId!: number;

  @Column({ nullable: true })
  details!: string;

  @Column()
  organizationId!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
