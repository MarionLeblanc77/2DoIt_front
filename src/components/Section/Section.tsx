import { ChangeEvent } from "react";
import { CheckSquare, Square } from "react-feather";
import DOMPurify from "dompurify";
import "./Section.scss";
import type { ISection } from "../../@types/task";
import { useAppDispatch } from "../../store/hooks-redux";
import { actionChangeTaskStateInfo } from "../../store/reducers/taskReducer";
import updateTask from "../../store/middlewares/updateTask";

export default function Section({
  id,
  title,
  tasks,
  lastUpdatedDate,
}: ISection) {
  const dispatch = useAppDispatch();

  const handleChangeContent =
    (taskId: number) => (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        actionChangeTaskStateInfo({
          sectionId: id,
          taskId,
          fieldName: "content",
          newValue: DOMPurify.sanitize(event.target.value),
        })
      );
    };

  const handleSubmitContent = (taskId: number) => () => {
    const updatedTask = tasks.find((task) => task.id === taskId);
    if (updatedTask) {
      dispatch(
        updateTask({
          id: taskId,
          content: updatedTask.content,
        })
      );
    }
  };

  return (
    <div className={"section ".concat("section", id.toString())}>
      <h2 className="section-title">{title}</h2>
      <ul className="section-tasks">
        {tasks.map((task) => (
          <li className="section-task section-task-item" key={task.id}>
            {task.active ? (
              <Square size="1.2rem" />
            ) : (
              <CheckSquare size="1.2rem" />
            )}
            <input
              className="section-task-input"
              type="text"
              value={task.content}
              onChange={handleChangeContent(task.id)}
              onBlur={handleSubmitContent(task.id)}
            />
          </li>
        ))}
        <li className="section-task section-task-add">
          <Square size="1.2rem" />
          Add a new task...
        </li>
      </ul>
      <small>{lastUpdatedDate}</small>
    </div>
  );
}
