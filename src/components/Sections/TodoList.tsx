import "./TodoList.scss";
import type { ITodoList } from "../../@types/app";

export default function TodoList({
  id,
  title,
  tasks,
  lastUpdatedDate,
}: ITodoList) {
  return (
    <div className={"section_content ".concat("section", id.toString())}>
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

