import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Organization } from '../organizations/organization.entity';

export enum TaskStatus {
  TODO = 'Todo',
  IN_PROGRESS = 'InProgress',
  DONE = 'Done',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ type: 'varchar', default: TaskStatus.TODO })
  status!: TaskStatus;

  @Column({ nullable: true })
  category!: string;

  @Column({ default: 0 })
  order!: number;

  @ManyToOne(() => User, (user) => user.createdTasks, { eager: true })
  owner!: User;

  @Column()
  ownerId!: number;

  @ManyToOne(() => Organization, (org) => org.tasks, { eager: true })
  organization!: Organization;

  @Column()
  organizationId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
