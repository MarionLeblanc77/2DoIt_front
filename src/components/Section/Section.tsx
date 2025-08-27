import { ChangeEvent, useState } from "react";
import { Square, Trash2 } from "react-feather";
import DOMPurify from "dompurify";
import "./Section.scss";
import type { ISection } from "../../@types/task";
import { useAppDispatch } from "../../store/hooks-redux";
import { actionChangeSectionStateInfo } from "../../store/reducers/taskReducer";
import addTask from "../../store/middlewares/addTask";
import updateSection from "../../store/middlewares/updateSection";
import deleteSection from "../../store/middlewares/deleteSection";
import addSection from "../../store/middlewares/addSection";
import Task from "../Task/Task";

export default function Section({
  id,
  title,
  position,
  tasks,
  lastUpdatedDate,
}: ISection) {
  const dispatch = useAppDispatch();

  const [newTaskContent, setNewTaskContent] = useState<string>("");

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

  const handleSubmitTitle = () => () => {
    if (id === 0) {
      dispatch(addSection({ title, position }));
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
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSubmitTitle()();
              e.currentTarget.blur();
            }
          }}
          placeholder={id === 0 ? "Add a new list..." : ""}
        />
        <Trash2
          className="delete-icon"
          size="1.2rem"
          onClick={() => dispatch(deleteSection({ id }))}
        />
      </h2>
      <ul className="section-tasks">
        {tasks.map((task) => (
          <Task key={task.id} task={task} sectionId={id} />
        ))}
        <li className="section-task section-task-add">
          <Square size="1.2rem" />
          <input
            className="section-task-input input"
            type="text"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            onBlur={handleAddTask()}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
                e.currentTarget.blur();
              }
            }}
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
