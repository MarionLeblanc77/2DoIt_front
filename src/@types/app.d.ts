export interface ITodoList {
  id: number;
  title: string;
  tasks: ITask[];
  lastUpdatedDate: Date;
}

export interface ITask {
  id: number;
  content: string;
  users: number[];
}

