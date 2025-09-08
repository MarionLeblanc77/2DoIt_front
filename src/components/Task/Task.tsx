import { ChangeEvent, useRef, useState } from "react";
import { CheckSquare, Square, Trash2, Users } from "react-feather";
import DOMPurify from "dompurify";
import { ITask } from "../../@types/task";
import UserIcon from "../UserIcon/UserIcon";
import { useAppDispatch, useAppSelector } from "../../store/hooks-redux";
import { actionChangeTaskStateInfo } from "../../store/reducers/taskReducer";
import updateTask from "../../store/middlewares/updateTask";
import deleteTask from "../../store/middlewares/deleteTask";
import AddContactModal from "../AddContactModal/AddContactModal";
import toggleActive from "../../store/middlewares/toggleActive";

interface TaskProps {
  task: ITask;
  sectionId: number;
}

export default function Task({ task, sectionId }: TaskProps) {
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const userId = useAppSelector((state) => state.userReducer.connectedUser.id);
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

  const contacts = task.users?.filter((user) => user.id !== userId) || [];

  const userIconRef = useRef<HTMLElement>(null);

  const unsetAddContactModalIfOpen = () => {
    if (isAddContactModalOpen) {
      setIsAddContactModalOpen(false);
    }
  };

  return (
    <li
      className="section-task editable-element"
      onBlur={unsetAddContactModalIfOpen}
      onMouseLeave={unsetAddContactModalIfOpen}
    >
      {task.active ? (
        <Square
          size="1.2rem"
          className="checkbox-icon"
          onClick={() => dispatch(toggleActive({ id: task.id, sectionId }))}
        />
      ) : (
        <CheckSquare
          size="1.2rem"
          className="checkbox-icon"
          onClick={() => dispatch(toggleActive({ id: task.id, sectionId }))}
        />
      )}

      <input
        className="section-task-input input"
        type="text"
        value={task.content}
        onChange={handleChangeTaskContent(task.id)}
        onBlur={handleSubmitContent(task.id)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSubmitContent(task.id)();
            e.currentTarget.blur();
          }
        }}
        style={!task.active ? { textDecoration: "line-through" } : {}}
      />
      {contacts.length > 0 && (
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
      <span ref={userIconRef} className="users-icon-container">
        <Users
          className="users-icon"
          size="1.2rem"
          onClick={() => setIsAddContactModalOpen(!isAddContactModalOpen)}
        />
      </span>
      {isAddContactModalOpen && userIconRef.current && (
        <AddContactModal
          position={userIconRef.current.getBoundingClientRect()}
          taskId={task.id}
        />
      )}
      <Trash2
        className="delete-icon"
        size="1.2rem"
        onClick={() => dispatch(deleteTask({ id: task.id }))}
      />
    </li>
  );
}
