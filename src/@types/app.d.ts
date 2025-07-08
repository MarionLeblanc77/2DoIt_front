export interface ISection {
  title: string;
  tasks: ITask[];
  lastUpdatedDate: Date;
}

export interface ITask {
  id: number;
  content: string;
  users: number[];
}

