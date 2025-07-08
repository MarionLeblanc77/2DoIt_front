import "./Sections.scss";
import type { ITask } from "../../@types/app";

type SectionProps = {
  title: string;
  tasks: ITask[];
  lastUpdatedDate: Date;
};
export default function Section({
  title,
  tasks,
  lastUpdatedDate,
}: SectionProps) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.content}</li>
        ))}
      </ul>
      <small>{lastUpdatedDate.toDateString()}</small>
    </div>
  );
}
