export interface ISection {
  id: number;
  title: string;
  tasks: ITask[];
  lastUpdatedDate: string;
}

export interface ITask {
  id: number;
  content: string;
  users: number[];
  active: boolean;
}
