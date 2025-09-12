/* eslint-disable no-plusplus */
import { useEffect, useMemo, useState } from "react";
import "./Dashboard.scss";
import Section from "../../components/Section/Section";
import { ISection } from "../../@types/task";
import getNbColumns from "../../utils/app";
import { useAppDispatch, useAppSelector } from "../../store/hooks-redux";
import {
  actionChangeSectionOrder,
  actionChangeTaskOrder,
} from "../../store/reducers/taskReducer";
import updateSectionsPositions from "../../store/middlewares/updateSectionsPositions";
import updateTasksPositions from "../../store/middlewares/updateTasksPositions";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const userSections = useAppSelector((state) => state.taskReducer.sections);

  const [nbColumns, setNbColumns] = useState<number>(getNbColumns);
  const [dragData, setDragData] = useState<{
    elementId: number;
    type: "section" | "task" | undefined;
    fixedInitialPosition: number;
    fixedInitialSection?: number;
    moveInitialPosition: number;
    moveInitialSection?: number;
  }>({
    elementId: 0,
    type: undefined,
    fixedInitialPosition: 0,
    fixedInitialSection: 0,
    moveInitialPosition: 0,
    moveInitialSection: 0,
  });
  const [currentHover, setCurrentHover] = useState<{
    elementId?: number;
    position: number;
  } | null>(null);

  useEffect(() => {
    function handleResize() {
      const newColumns = getNbColumns();
      setNbColumns((prev) => (prev !== newColumns ? newColumns : prev));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatedTodoLists: ISection[][] = useMemo(() => {
    const sortedUserSections = [...userSections].sort(
      (a, b) => a.position - b.position
    );
    if (nbColumns === 1) {
      return [sortedUserSections];
    }
    const result: ISection[][] = [];

    for (let i = 0; i < nbColumns; i++) {
      const subSection: ISection[] = [];
      if (sortedUserSections[i]) {
        subSection.push(sortedUserSections[i]);
      }
      subSection.push(
        ...sortedUserSections.filter(
          (_, index) => index > i && index % nbColumns === i
        )
      );
      if (subSection.length > 0) {
        result.push(subSection);
      }
    }
    return result;
  }, [nbColumns, userSections]);

  const handleDragStart = (
    e: React.DragEvent<HTMLElement>,
    type: "section" | "task",
    elementId: number,
    initialPosition: number,
    initialSection?: number
  ) => {
    e.stopPropagation();
    if (e.target !== e.currentTarget) {
      return;
    }
    setDragData({
      elementId,
      type,
      fixedInitialPosition: initialPosition,
      fixedInitialSection: initialSection,
      moveInitialPosition: initialPosition,
      moveInitialSection: initialSection,
    });
    setCurrentHover({
      elementId: initialSection,
      position: initialPosition,
    });
  };

  const handleDragEnter = (
    e: React.DragEvent<HTMLElement>,
    arrivalPosition: number,
    arrivalSection?: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragData.type === "section") {
      if (currentHover?.elementId !== arrivalPosition) {
        setCurrentHover((prev) => ({ ...prev, position: arrivalPosition }));
        dispatch(
          actionChangeSectionOrder({
            sectionId: dragData.elementId,
            arrivalPosition,
            initialPosition: dragData.moveInitialPosition,
          })
        );
      }
    } else if (
      dragData.type === "task" &&
      (currentHover?.position !== arrivalPosition ||
        currentHover?.elementId !== arrivalSection)
    ) {
      setCurrentHover({
        elementId: arrivalSection,
        position: arrivalPosition,
      });
      if (dragData.moveInitialSection && arrivalSection) {
        dispatch(
          actionChangeTaskOrder({
            taskId: dragData.elementId,
            initialSection: dragData.moveInitialSection,
            initialPosition: dragData.moveInitialPosition,
            arrivalSection,
            arrivalPosition,
          })
        );
      }
    }
    setDragData((prev) => ({
      ...prev,
      moveInitialPosition: arrivalPosition,
      moveInitialSection: arrivalSection ?? prev.moveInitialSection,
    }));
  };

  const handleDragDrop = () => {
    if (dragData.type === "section") {
      if (dragData.fixedInitialPosition !== currentHover?.position) {
        const currentHoveredPosition = currentHover?.position;
        if (currentHoveredPosition === undefined) return;
        const newPositions = userSections
          .map((section) => ({
            id: section.id,
            position: section.position,
          }))
          .filter(
            (section) =>
              section.id !== 0 &&
              (dragData.fixedInitialPosition < currentHoveredPosition
                ? section.position >= dragData.fixedInitialPosition &&
                  section.position <= currentHoveredPosition
                : section.position <= dragData.fixedInitialPosition &&
                  section.position >= currentHoveredPosition)
          );
        dispatch(updateSectionsPositions({ newPositions }));
      }
    } else if (
      dragData.type === "task" &&
      currentHover &&
      currentHover.elementId &&
      dragData.fixedInitialSection &&
      (dragData.fixedInitialSection !== currentHover?.elementId ||
        dragData.fixedInitialPosition !== currentHover?.position)
    ) {
      dispatch(
        updateTasksPositions({
          previousSectionId: dragData.fixedInitialSection,
          previousPosition: dragData.fixedInitialPosition,
          newSectionId: currentHover.elementId,
          newPosition: currentHover.position,
        })
      );
    }
    setCurrentHover(null);
    setDragData({
      elementId: 0,
      type: undefined,
      fixedInitialPosition: 0,
      fixedInitialSection: 0,
      moveInitialPosition: 0,
      moveInitialSection: 0,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    if (e.clientY < 200) {
      window.scrollBy(0, -20);
    } else if (e.clientY > document.documentElement.clientHeight - 200) {
      window.scrollBy(0, 20);
    }
  };

  return (
    <div className="dashboard">
      {formatedTodoLists.map((subSection) => (
        <div
          key={subSection
            .filter(Boolean)
            .map((section) => section.id)
            .join("-")}
        >
          {subSection.map((section) => {
            if (!section) return null;
            return (
              <div
                key={section.id}
                onDragOver={section.id !== 0 ? handleDragOver : undefined}
                onDragEnter={
                  section.id !== 0
                    ? (e) => handleDragEnter(e, section.position)
                    : undefined
                }
              >
                <div
                  className="dashboard-section"
                  draggable={section.id !== 0}
                  data-drag-type="section"
                  onDragStart={(e) =>
                    handleDragStart(e, "section", section.id, section.position)
                  }
                  onDrop={() => handleDragDrop()}
                >
                  <Section
                    id={section.id}
                    title={section.title}
                    position={section.position}
                    tasks={section.tasks}
                    lastUpdatedDate={section.lastUpdatedDate}
                    handleDragStartTask={handleDragStart}
                    handleDragEnterTask={handleDragEnter}
                    handleDragOverTask={handleDragOver}
                    handleDragDropTask={handleDragDrop}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
