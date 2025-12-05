import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { Task } from '../tasks/task.entity';
import { AuditLog } from '../audit/audit-log.entity';

export enum UserRole {
  OWNER = 'Owner',
  ADMIN = 'Admin',
  VIEWER = 'Viewer',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: 'varchar', default: UserRole.VIEWER })
  role!: UserRole;

  @ManyToOne(() => Organization, (org) => org.users, { eager: true })
  @JoinColumn({ name: 'organizationId' })
  organization!: Organization;

  @Column()
  organizationId!: number;

  @OneToMany(() => Task, (task) => task.owner)
  createdTasks!: Task[];

  @OneToMany(() => AuditLog, (log: AuditLog) => log.user)
  auditLogs!: AuditLog[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
