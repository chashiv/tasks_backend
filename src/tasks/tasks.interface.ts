import { UUID } from 'crypto';

export enum TaskStatusEnum {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface IMetaData {
  [key: string]: string;
}

export interface ICreateTask {
  title: string;
  description: string;
  status: TaskStatusEnum;
}

export interface IUpdateTask {
  id: UUID;
  title?: string;
  description?: string;
  status?: TaskStatusEnum;
  metaData?: IMetaData;
}
