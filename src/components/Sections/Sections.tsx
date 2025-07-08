import "./Sections.scss";
import type { ISection, ITask } from "../../@types/app";

export default function Section({ title, tasks, lastUpdatedDate }: ISection) {
  return (
    <div className="section_content">
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

