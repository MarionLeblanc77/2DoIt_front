import { ChangeEvent, useState } from "react";
import { CheckSquare, Square, Trash2 } from "react-feather";
import DOMPurify from "dompurify";
import "./Section.scss";
import type { ISection } from "../../@types/task";
import { useAppDispatch } from "../../store/hooks-redux";
import {
  actionChangeSectionStateInfo,
  actionChangeTaskStateInfo,
} from "../../store/reducers/taskReducer";
import updateTask from "../../store/middlewares/updateTask";
import addTask from "../../store/middlewares/addTask";
import deleteTask from "../../store/middlewares/deleteTask";
import updateSection from "../../store/middlewares/updateSection";
import deleteSection from "../../store/middlewares/deleteSection";
import addSection from "../../store/middlewares/addSection";

export default function Section({
  id,
  title,
  tasks,
  lastUpdatedDate,
}: ISection) {
  const dispatch = useAppDispatch();

  const [newTaskContent, setNewTaskContent] = useState<string>("");

  const handleChangeTaskContent =
    (taskId?: number) => (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        actionChangeTaskStateInfo({
          sectionId: id,
          taskId,
          fieldName: "content",
          newValue: DOMPurify.sanitize(event.target.value),
        })
      );
    };

  const handleChangeSectionTitle =
    () => (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        actionChangeSectionStateInfo({
          sectionId: id,
          fieldName: "title",
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

  const handleSubmitTitle = () => () => {
    if (id === 0) {
      dispatch(addSection({ title }));
    } else {
      dispatch(
        updateSection({
          id,
          title,
        })
      );
    }
  };

  const handleAddTask = () => () => {
    dispatch(
      addTask({
        sectionId: id,
        content: newTaskContent,
      })
    );
    setNewTaskContent("");
  };

  return (
    <div className={"section ".concat("section", id.toString())}>
      <h2 className="section-title editable-element">
        <input
          className="section-title-input input"
          type="text"
          value={title}
          onChange={handleChangeSectionTitle()}
          onBlur={handleSubmitTitle()}
          placeholder={id === 0 ? "Add a new task..." : ""}
        />
        <Trash2
          className="delete-icon"
          size="1.2rem"
          onClick={() => dispatch(deleteSection({ id }))}
        />
      </h2>
      <ul className="section-tasks">
        {tasks.map((task) => (
          <li className="section-task editable-element" key={task.id}>
            {task.active ? (
              <Square size="1.2rem" />
            ) : (
              <CheckSquare size="1.2rem" />
            )}
            <input
              className="section-task-input input"
              type="text"
              value={task.content}
              onChange={handleChangeTaskContent(task.id)}
              onBlur={handleSubmitContent(task.id)}
            />
            <Trash2
              className="delete-icon"
              size="1.2rem"
              onClick={() => dispatch(deleteTask({ id: task.id }))}
            />
          </li>
        ))}
        <li className="section-task section-task-add">
          <Square size="1.2rem" />
          <input
            className="section-task-input input"
            type="text"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            onBlur={handleAddTask()}
            placeholder="Add a new task..."
          />
        </li>
      </ul>
      {id !== 0 && (
        <small className="section-update">
          Last updated on WIP not done {lastUpdatedDate}
        </small>
      )}
    </div>
  );
}
