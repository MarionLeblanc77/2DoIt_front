import { ChangeEvent } from "react";
import { CheckSquare, Square, Trash2, Users } from "react-feather";
import DOMPurify from "dompurify";
import { ITask } from "../../@types/task";
import UserIcon from "../UserIcon/UserIcon";
import { useAppDispatch } from "../../store/hooks-redux";
import { actionChangeTaskStateInfo } from "../../store/reducers/taskReducer";
import updateTask from "../../store/middlewares/updateTask";
import deleteTask from "../../store/middlewares/deleteTask";

interface TaskProps {
  task: ITask;
  sectionId: number;
}

export default function Task({ task, sectionId }: TaskProps) {
  console.log("Task component rendered", task);
  const dispatch = useAppDispatch();

  const handleChangeTaskContent =
    (taskId?: number) => (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        actionChangeTaskStateInfo({
          sectionId,
          taskId,
          fieldName: "content",
          newValue: DOMPurify.sanitize(event.target.value),
        })
      );
    };

  const handleSubmitContent = (taskId: number) => () => {
    dispatch(
      updateTask({
        id: taskId,
        content: task.content,
      })
    );
  };

  const contacts = task.users?.slice(1);

  return (
    <li className="section-task editable-element">
      {task.active ? (
        <Square size="1.2rem" className="checkbox-icon" />
      ) : (
        <CheckSquare size="1.2rem" className="checkbox-icon" />
      )}
      <input
        className="section-task-input input"
        type="text"
        value={task.content}
        onChange={handleChangeTaskContent(task.id)}
        onBlur={handleSubmitContent(task.id)}
      />
      {contacts.length > 1 && (
        <ul className="section-task-contacts">
          {contacts.map((user) => (
            <li key={user.id} className="section-task-contact">
              <UserIcon
                id={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                taskId={task.id}
              />
            </li>
          ))}
        </ul>
      )}
      <Users className="users-icon" size="1.2rem" />
      <Trash2
        className="delete-icon"
        size="1.2rem"
        onClick={() => dispatch(deleteTask({ id: task.id }))}
      />
    </li>
  );
}

