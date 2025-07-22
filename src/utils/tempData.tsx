import { ISection } from "../@types/task";

const data: ISection[] = [
  {
    id: 1,
    title: "À faire1",
    tasks: [
      { id: 1, content: "Tâche 1", users: [1, 2] },
      { id: 2, content: "Tâche 2", users: [1, 2] },
      { id: 3, content: "Tâche 3", users: [1, 2] },
    ],
    lastUpdatedDate: new Date(),
  },
  {
    id: 2,
    title: "En cours2",
    tasks: [
      { id: 3, content: "Tâche 3", users: [1, 2] },
      { id: 4, content: "Tâche 4", users: [1, 2] },
    ],
    lastUpdatedDate: new Date(),
  },
  {
    id: 3,
    title: "Terminées3",
    tasks: [
      { id: 5, content: "Tâche 5", users: [1, 2] },
      { id: 6, content: "Tâche 6", users: [1, 2] },
      { id: 1, content: "Tâche 5", users: [1, 2] },
      { id: 2, content: "Tâche 6", users: [1, 2] },
    ],
    lastUpdatedDate: new Date(),
  },
  {
    id: 4,
    title: "À faire4",
    tasks: [
      { id: 1, content: "Tâche 1", users: [1, 2] },
      { id: 2, content: "Tâche 2", users: [1, 2] },
    ],
    lastUpdatedDate: new Date(),
  },
  {
    id: 5,
    title: "En cours5",
    tasks: [
      { id: 3, content: "Tâche 3", users: [1, 2] },
      { id: 4, content: "Tâche 4", users: [1, 2] },
    ],
    lastUpdatedDate: new Date(),
  },
  {
    id: 6,
    title: "Terminées6",
    tasks: [
      { id: 5, content: "Tâche 5", users: [1, 2] },
      { id: 6, content: "Tâche 6", users: [1, 2] },
    ],
    lastUpdatedDate: new Date(),
  },
];

export default data;
