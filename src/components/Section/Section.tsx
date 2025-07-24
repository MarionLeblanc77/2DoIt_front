import { CheckSquare, Square } from "react-feather";
import "./Section.scss";
import type { ISection } from "../../@types/task";

export default function TodoList({
  id,
  title,
  tasks,
  lastUpdatedDate,
}: ISection) {
  return (
    <div className={"section ".concat("section", id.toString())}>
      <h2 className="section-title">{title}</h2>
      <ul className="section-tasks">
        {tasks.map((task) => (
          <li className="section-task" key={task.id}>
            <Square />
            <CheckSquare />
            {task.content}
          </li>
        ))}
      </ul>
      <small>{lastUpdatedDate}</small>
    </div>
  );
}
