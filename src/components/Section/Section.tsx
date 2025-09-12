import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Square, Trash2 } from "react-feather";
import DOMPurify from "dompurify";
import "./Section.scss";
import type { ISection, ITask } from "../../@types/task";
import { useAppDispatch } from "../../store/hooks-redux";
import { actionChangeSectionStateInfo } from "../../store/reducers/taskReducer";
import addTask from "../../store/middlewares/addTask";
import updateSection from "../../store/middlewares/updateSection";
import deleteSection from "../../store/middlewares/deleteSection";
import addSection from "../../store/middlewares/addSection";
import Task from "../Task/Task";

interface SectionProps extends ISection {
  handleDragStartTask: (
    e: React.DragEvent<HTMLElement>,
    type: "section" | "task",
    taskId: number,
    initialPosition: number,
    initialSection: number
  ) => void;
  handleDragEnterTask: (
    e: React.DragEvent<HTMLElement>,
    arrivalPosition: number,
    arrivalSection: number
  ) => void;
  handleDragOverTask: (e: React.DragEvent<HTMLElement>) => void;
  handleDragDropTask: () => void;
}

export default function Section({
  id,
  title,
  position,
  tasks,
  lastUpdatedDate,
  handleDragStartTask,
  handleDragEnterTask,
  handleDragOverTask,
  handleDragDropTask,
}: SectionProps) {
  const dispatch = useAppDispatch();

  const [newTaskContent, setNewTaskContent] = useState<string>("");
  const [orderedTasks, setOrderedTask] = useState<ITask[]>([]);

  const newTaskInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOrderedTask([...tasks].sort((a, b) => a.position - b.position));
  }, [tasks]);

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
      if (title.trim() !== "") {
        dispatch(addSection({ title, position }));
      }
      dispatch(
        actionChangeSectionStateInfo({
          sectionId: id,
          fieldName: "title",
          newValue: "",
        })
      );
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
    if (newTaskContent.trim() !== "") {
      dispatch(
        addTask({
          sectionId: id,
          content: newTaskContent,
        })
      );
    }
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
              handleSubmitTitle();
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
        {orderedTasks.map((task) => (
          <div
            key={task.id}
            onDragOver={task.id !== 0 ? handleDragOverTask : undefined}
            onDragEnter={
              task.id !== 0
                ? (e) => handleDragEnterTask(e, task.position, id)
                : undefined
            }
          >
            <div
              draggable={task.id !== 0}
              data-drag-type="task"
              onDragStart={(e) =>
                handleDragStartTask(e, "task", task.id, task.position, id)
              }
              onDrop={() => handleDragDropTask()}
            >
              <Task task={task} sectionId={id} />
            </div>
          </div>
        ))}
        <li className="section-task section-task-add">
          <Square size="1.2rem" />
          <input
            className="section-task-input input"
            ref={newTaskInput}
            type="text"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            onBlur={handleAddTask()}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
                e.currentTarget.blur();
                newTaskInput.current!.focus();
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
