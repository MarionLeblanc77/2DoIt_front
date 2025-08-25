import { IUser } from "./user";

export interface ISection {
  id: number;
  title: string;
  tasks: ITask[];
  position: number;
  lastUpdatedDate: string;
}

export interface ITask {
  id: number;
  content: string;
  users: IUser[];
  active: boolean;
}
