import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IMetaData, TaskStatusEnum } from './tasks.interface';

@Entity({ name: 'tasks' })
export class TasksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.TO_DO,
  })
  status: TaskStatusEnum;

  @Column({ type: 'jsonb', nullable: true })
  metaData: IMetaData;
}
