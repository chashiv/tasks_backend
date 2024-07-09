import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IMetaData, TaskStatusEnum } from './tasks.interface';
import { UsersEntity } from 'src/users/users.entity';

@Entity({ name: 'tasks' })
export class TasksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.TO_DO,
  })
  status: TaskStatusEnum;

  @Column({ type: 'jsonb', nullable: true })
  metaData: IMetaData;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
