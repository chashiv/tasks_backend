export enum TaskStatusEnum {
  TO_DO = 'to_do',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export interface ICreateTask {
  title: string;
  description: string;
  status: TaskStatusEnum;
}
