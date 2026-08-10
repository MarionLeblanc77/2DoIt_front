import { IUser } from "./user";

export interface ISection {
  id: number;
  title: string;
  tasks: ITask[];
  position: number;
}

export interface ITask {
  id: number;
  content: string;
  users: IUser[];
  active: boolean;
  position: number;
}
