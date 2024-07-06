import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatusEnum } from './tasks.interface';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column()
  metaData: JSON;
}
