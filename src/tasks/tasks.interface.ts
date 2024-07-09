import { UUID } from 'crypto';

export enum TaskStatusEnum {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface IMetaData {
  [key: string]: string;
}

export interface IGetTask {
  id: UUID;
  title?: string;
  description?: string;
  status?: TaskStatusEnum;
  metaData?: IMetaData;
  userId: string;
}

export interface ICreateTask {
  userId: string;
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
  userId: string;
}

export interface IDeleteTask {
  id: UUID;
  title?: string;
  description?: string;
  status?: TaskStatusEnum;
  metaData?: IMetaData;
  userId: string;
}
